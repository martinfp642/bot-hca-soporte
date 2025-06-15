const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const PORT = process.env.PORT || 3000;

console.log('🚀 Iniciando Bot HCA...');
console.log('🔧 Configurando WhatsApp Web...');
console.log('⏳ Esto puede tomar 1-3 minutos...');

// Cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox', 
            '--disable-web-security',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ],
        headless: true
    }
});

// QR Code
client.on('qr', (qr) => {
    console.log('📱 ¡QR GENERADO! Escanea este QR:');
    console.log('==========================================');
    console.log('QR STRING COMPLETO:');
    console.log(qr);
    console.log('==========================================');
    qrcode.generate(qr, {small: true});
    console.log('==========================================');
    console.log('✅ Copia el QR STRING para generar QR en web');
});
// Logs de progreso
client.on('loading_screen', (percent, message) => {
    console.log(`⏳ Cargando WhatsApp: ${percent}% - ${message}`);
});

client.on('authenticated', () => {
    console.log('🔐 WhatsApp autenticado correctamente');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Error de autenticación:', msg);
});

client.on('disconnected', (reason) => {
    console.log('🔌 Desconectado de WhatsApp:', reason);
});

// Bot listo
client.on('ready', () => {
    console.log('✅ Bot HCA conectado y funcionando!');
    console.log('🎉 Listo para recibir mensajes');
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
