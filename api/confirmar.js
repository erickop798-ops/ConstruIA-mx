var https  = require('https');
var crypto = require('crypto');
function crearToken(email, plan) {
    var secret = process.env.STRIPE_WEBHOOK_SECRET || 'fallback';
    var expiry = Math.floor(Date.now() / 1000) + (35 * 24 * 60 * 60);
    var payload = email + '|' + plan + '|' + expiry;
    var sig = crypto.createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16);
    return Buffer.from(payload + '|' + sig).toString('base64');
}
module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') { return res.status(200).end(); }
    var sessionId = req.query && req.query.session;
    if (!sessionId) { return res.status(400).json({ error: 'session requerido' }); }
    var secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) { return res.status(500).json({ error: 'Config error' }); }
    var auth = Buffer.from(secretKey + ':').toString('base64');
    var options = {
        hostname: 'api.stripe.com', port: 443,
        path: '/v1/checkout/sessions/' + sessionId,
        method: 'GET',
        headers: { 'Authorization': 'Basic ' + auth, 'Stripe-Version': '2024-04-10' }
    };
    return new Promise(function(resolve) {
        var stripeReq = https.request(options, function(stripeRes) {
            var data = '';
            stripeRes.on('data', function(chunk) { data += chunk; });
            stripeRes.on('end', function() {
                try {
                    var session = JSON.parse(data);
                    if (session.payment_status === 'paid') {
                        var email = session.customer_details && session.customer_details.email;
                        var plan  = (session.metadata && session.metadata.plan) || session.client_reference_id || 'pro';
                        res.status(200).json({ token: crearToken(email || 'usuario', plan), plan: plan });
                    } else { res.status(200).json({ error: 'Pago no completado' }); }
                } catch (e) { res.status(500).json({ error: 'Error procesando respuesta' }); }
                resolve();
            });
        });
        stripeReq.on('error', function() { res.status(500).json({ error: 'Error de conexion' }); resolve(); });
        stripeReq.end();
    });
};
