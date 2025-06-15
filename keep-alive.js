const https = require('https');

setInterval(() => {
    const url = process.env.RENDER_EXTERNAL_URL || 'https://bot-hca-soporte.onrender.com';
    
    https.get(url, (res) => {
        console.log(`✅ Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
        console.log('❌ Keep-alive error:', err.message);
    });
}, 14 * 60 * 1000); // Cada 14 minutos

console.log('🔄 Keep-alive iniciado');
