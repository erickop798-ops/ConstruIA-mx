var crypto = require('crypto');
function verificarFirma(payload, sigHeader, secret) {
    try {
        var parts = sigHeader.split(',');
        var timestamp = '';
        var signatures = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i].trim();
            if (part.startsWith('t='))  { timestamp = part.slice(2); }
            if (part.startsWith('v1=')) { signatures.push(part.slice(3)); }
        }
        if (!timestamp || signatures.length === 0) { return false; }
        var now = Math.floor(Date.now() / 1000);
        if (Math.abs(now - parseInt(timestamp)) > 300) { return false; }
        var signedPayload = timestamp + '.' + payload;
        var expected = crypto.createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex');
        return signatures.some(function(sig) { return sig === expected; });
    } catch (e) { return false; }
}
function crearToken(email, plan) {
    var secret = process.env.STRIPE_WEBHOOK_SECRET || 'fallback';
    var expiry = Math.floor(Date.now() / 1000) + (35 * 24 * 60 * 60);
    var payload = email + '|' + plan + '|' + expiry;
    var sig = crypto.createHmac('sha256', secret).update(payload).digest('hex').slice(0, 16);
    return Buffer.from(payload + '|' + sig).toString('base64');
}
module.exports = async function handler(req, res) {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    var webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) { return res.status(500).json({ error: 'STRIPE_WEBHOOK_SECRET no configurada' }); }
    var rawBody = '';
    await new Promise(function(resolve) {
        req.on('data', function(chunk) { rawBody += chunk; });
        req.on('end', resolve);
    });
    var sigHeader = req.headers['stripe-signature'] || '';
    if (!verificarFirma(rawBody, sigHeader, webhookSecret)) {
        return res.status(400).json({ error: 'Firma invalida' });
    }
    var event;
    try { event = JSON.parse(rawBody); } catch (e) { return res.status(400).json({ error: 'JSON invalido' }); }
    var tipo = event.type || '';
    var data = (event.data && event.data.object) || {};
    if (tipo === 'checkout.session.completed') {
        var email = data.customer_details && data.customer_details.email;
        var plan  = (data.subscription_data && data.subscription_data.metadata && data.subscription_data.metadata.plan) || 'pro';
        if (email) {
            var token = crearToken(email, plan);
            console.log('Pago completado:', email, plan);
            return res.status(200).json({ received: true, token: token, plan: plan });
        }
    }
    if (tipo === 'customer.subscription.deleted') {
        console.log('Suscripcion cancelada:', data.customer_email || '');
    }
    return res.status(200).json({ received: true });
};
