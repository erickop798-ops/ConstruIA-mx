/* ConstruIA.mx — /api/checkout.js */
var https = require('https');

var PRICES = {
    basico: 'price_1TSLrU8BM5xw1iV9oaDpow9U',
    pro:    'price_1TSLsg8BM5xw1iV9phQQMXEB'
};

var URL_BASE = 'https://obra-digital-mx.vercel.app';

function stripeRequest(options, postData) {
    return new Promise(function(resolve, reject) {
        var req = https.request(options, function(res) {
            var data = '';
            res.on('data', function(c) { data += c; });
            res.on('end', function() {
                try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
                catch(e) { resolve({ status: res.statusCode, body: data }); }
            });
        });
        req.on('error', reject);
        req.setTimeout(15000, function() { req.destroy(new Error('timeout')); });
        if (postData) { req.write(postData); }
        req.end();
    });
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { return res.status(200).end(); }
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

    var secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        console.error('STRIPE_SECRET_KEY missing');
        return res.status(500).json({ error: 'Config error' });
    }

    var plan = 'pro';
    try {
        if (req.body && req.body.plan) { plan = req.body.plan; }
    } catch(e) {}

    var priceId = PRICES[plan] || PRICES.pro;
    console.log('Checkout iniciado:', plan, priceId);

    var params = 'mode=subscription' +
        '&line_items[0][price]=' + priceId +
        '&line_items[0][quantity]=1' +
        '&success_url=' + encodeURIComponent(URL_BASE + '/success.html?session_id={CHECKOUT_SESSION_ID}') +
        '&cancel_url=' + encodeURIComponent(URL_BASE + '/?cancelado=1') +
        '&locale=es' +
        '&client_reference_id=' + plan;

    var postData = Buffer.from(params, 'utf8');
    var auth = Buffer.from(secretKey + ':').toString('base64');

    var options = {
        hostname: 'api.stripe.com',
        port: 443,
        path: '/v1/checkout/sessions',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
            'Stripe-Version': '2024-04-10'
        }
    };

    try {
        var result = await stripeRequest(options, postData);
        console.log('Stripe response status:', result.status);

        if (result.status === 200 && result.body && result.body.url) {
            return res.status(200).json({ url: result.body.url });
        }

        var stripeError = (result.body && result.body.error && result.body.error.message) || 'Error en Stripe';
        console.error('Stripe error:', result.status, stripeError);
        return res.status(400).json({ error: stripeError });

    } catch(e) {
        console.error('Exception en checkout:', e.message);
        return res.status(500).json({ error: 'Error de conexion con Stripe' });
    }
};
