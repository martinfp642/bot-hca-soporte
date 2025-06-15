const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const PORT = process.env.PORT || 3000;

console.log('🚀 Iniciando Bot HCA...');

// Cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR Code
client.on('qr', (qr) => {
    console.log('📱 Escanea este QR:');
    console.log('QR String:', qr); // Línea adicional
    qrcode.generate(qr, {small: true});
});
// Bot listo
client.on('ready', () => {
    console.log('✅ Bot HCA conectado!');
});

// Mensajes
client.on('message', async (msg) => {
    const text = msg.body.toLowerCase();
    
    if (text.includes('wifi')) {
        await client.sendMessage(msg.from, 
            '📶 *WIFI HCA*\n\n' +
            '👨‍🎓 Alumnos: AlumnosHCA / Alumnos2024\n' +
            '👨‍🏫 Staff: HCAndersen / Colegio2024'
        );
    }
    else if (text.includes('eventifica')) {
        await client.sendMessage(msg.from,
            '📱 *EVENTIFICA*\n\n' +
            'Usuario: cédula sin puntos + hca\n' +
            'Ejemplo: 12345678hca\n' +
            'Contraseña: igual al usuario'
        );
    }
    else if (text.includes('siged')) {
        await client.sendMessage(msg.from,
            '💻 *SIGED*\n\n' +
            'Sistema para reportar:\n' +
            '• Cable HDMI roto\n' +
            '• Control TV/Aire dañado\n' +
            '• Equipos faltantes'
        );
    }
    else if (text.includes('humano') || text.includes('soporte')) {
        await client.sendMessage(msg.from,
            '👨‍💻 *SOPORTE HUMANO*\n\n' +
            'Email: soporte@hca.edu.uy\n' +
            'Horario: L-V 8:00-17:00'
        );
    }
    else if (text.includes('hola') || text.includes('menu')) {
        await client.sendMessage(msg.from,
            '🤖 *Bot Soporte HCA*\n\n' +
            'Comandos:\n' +
            '📶 wifi\n' +
            '📱 eventifica\n' +
            '💻 siged\n' +
            '👨‍💻 humano'
        );
    }
});

// Servidor web
const app = express();
app.get('/', (req, res) => {
    res.send('<h1>🤖 Bot HCA Funcionando ✅</h1>');
});

app.listen(PORT, () => {
    console.log(`🌐 Servidor: ${PORT}`);
});

# Agregar al final de app.js, antes de client.initialize():
if (process.env.NODE_ENV === 'production') {
    require('./keep-alive');
}

// Iniciar
client.initialize();
