/* ============================================================
   ConstruIA.mx — /api/agente.js
   Proxy serverless Vercel → Anthropic Claude API
   Recibe: POST { system: string, messages: [{role, content}] }
   Devuelve: { content: [{ type: 'text', text: string }] }
   Compatible con: agente flotante, T-3 remodelacion, Funcion B
   ============================================================ */

module.exports = async function handler(req, res) {

    /* ── CORS ── */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { return res.status(200).end(); }

    /* ── Solo POST ── */
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    /* ── API key ── */
    var apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            content: [{ type: 'text', text: 'Error de configuracion: API key no encontrada.' }]
        });
    }

    /* ── Validar body ── */
    var body = req.body;
    if (!body || !body.messages || !Array.isArray(body.messages)) {
        return res.status(400).json({ error: 'Body invalido: se requiere messages[]' });
    }

    /* ── Sanitizar mensajes ── */
    var messages = [];
    for (var i = 0; i < body.messages.length; i++) {
        var msg = body.messages[i];
        if (msg && (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string') {
            messages.push({
                role: msg.role,
                content: String(msg.content).slice(0, 4000) /* max 4000 chars por mensaje */
            });
        }
    }

    /* El ultimo mensaje debe ser del usuario */
    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
        return res.status(400).json({ error: 'El ultimo mensaje debe ser del usuario' });
    }

    /* ── Limitar historial a 10 turnos (5 user + 5 assistant) ── */
    if (messages.length > 10) {
        messages = messages.slice(messages.length - 10);
        /* Asegurar que el primer mensaje es user */
        while (messages.length > 0 && messages[0].role !== 'user') {
            messages = messages.slice(1);
        }
    }

    /* ── System prompt ── */
    var systemPrompt = typeof body.system === 'string'
        ? String(body.system).slice(0, 8000)
        : 'Eres el Agente IA de ConstruIA.mx, copiloto de construccion en Mexico.';

    /* ── Llamada a Claude API ── */
    var https = require('https');
    var requestBody = JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system:     systemPrompt,
        messages:   messages
    });

    var options = {
        hostname: 'api.anthropic.com',
        port:     443,
        path:     '/v1/messages',
        method:   'POST',
        headers: {
            'Content-Type':      'application/json',
            'x-api-key':         apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Length':    Buffer.byteLength(requestBody)
        }
    };

    return new Promise(function(resolve) {
        var claudeReq = https.request(options, function(claudeRes) {
            var data = '';
            claudeRes.on('data', function(chunk) { data += chunk; });
            claudeRes.on('end', function() {
                try {
                    var parsed = JSON.parse(data);

                    /* Error devuelto por Anthropic */
                    if (parsed.error) {
                        var errMsg = 'Error del servicio IA: ' + (parsed.error.message || 'desconocido');
                        res.status(200).json({
                            content: [{ type: 'text', text: errMsg }]
                        });
                        return resolve();
                    }

                    /* Respuesta exitosa — devolver en el formato que espera el frontend */
                    if (parsed.content && parsed.content[0] && parsed.content[0].text) {
                        res.status(200).json({
                            content: [{ type: 'text', text: parsed.content[0].text }]
                        });
                        return resolve();
                    }

                    /* Respuesta inesperada */
                    res.status(200).json({
                        content: [{ type: 'text', text: 'Respuesta inesperada del servicio. Intenta de nuevo.' }]
                    });
                    resolve();

                } catch (parseError) {
                    res.status(200).json({
                        content: [{ type: 'text', text: 'Error procesando respuesta. Intenta de nuevo.' }]
                    });
                    resolve();
                }
            });
        });

        claudeReq.on('error', function(err) {
            res.status(200).json({
                content: [{ type: 'text', text: 'Error de conexion con el servicio IA. Verifica tu internet.' }]
            });
            resolve();
        });

        /* Timeout de 25 segundos (Vercel hobby tiene limite de 30s) */
        claudeReq.setTimeout(25000, function() {
            claudeReq.destroy();
            res.status(200).json({
                content: [{ type: 'text', text: 'El servicio tardo demasiado. Intenta de nuevo.' }]
            });
            resolve();
        });

        claudeReq.write(requestBody);
        claudeReq.end();
    });
};
