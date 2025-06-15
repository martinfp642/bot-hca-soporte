const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const PORT = process.env.PORT || 3000;
let qrString = '';
let botStatus = '⏳ Inicializando WhatsApp Web...';

// Tu número de WhatsApp para recibir mensajes directos
const ADMIN_NUMBER = '59895819988@c.us';

// URL del formulario de reportes
const FORMULARIO_REPORTES = 'https://script.google.com/macros/s/AKfycbxgTa_P-BIANfwjmIbRtF72lG_5Bw0w947ifGMIa_0kqed81YFwgTmUBecIyuRWeIRHqg/exec';

console.log('🚀 Iniciando Bot HCA...');
console.log('🌐 QR estará disponible en la página web');

const app = express();

// Página principal con QR
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bot Soporte HCA - QR Code</title>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="15">
            <style>
                body { font-family: Arial; text-align: center; padding: 20px; background: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .status { padding: 10px; margin: 20px 0; border-radius: 5px; }
                .ready { background: #d4edda; color: #155724; }
                .waiting { background: #fff3cd; color: #856404; }
                .qr-container { margin: 20px 0; }
                textarea { width: 90%; height: 120px; margin: 10px 0; font-family: monospace; }
                .info { background: #e9ecef; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: left; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🤖 Bot de Soporte IT - HCA</h1>
                
                <div class="status ${qrString ? 'ready' : 'waiting'}">
                    <strong>Estado:</strong> ${botStatus}
                </div>
                
                ${qrString ? `
                    <div class="qr-container">
                        <h2>📱 Escanea este QR con WhatsApp:</h2>
                        <div id="qrcode"></div>
                        <p><strong>Instrucciones:</strong></p>
                        <ol style="text-align: left; display: inline-block;">
                            <li>Abre WhatsApp en tu teléfono</li>
                            <li>Ve a Menú (3 puntos) → WhatsApp Web</li>
                            <li>Escanea el código QR de arriba</li>
                            <li>¡Listo! El bot estará conectado</li>
                        </ol>
                        
                        <details>
                            <summary>Ver código QR como texto</summary>
                            <textarea readonly>${qrString}</textarea>
                            <p><small>Puedes copiar este texto y generar un QR en otra página si es necesario.</small></p>
                        </details>
                    </div>
                    
                    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
                    <script>
                        QRCode.toCanvas(document.getElementById('qrcode'), '${qrString}', {
                            width: 300,
                            margin: 2
                        }
        else if (text.includes('crea') || text.includes('plataforma')) {
            await client.sendMessage(msg.from,
                '🎓 *PLATAFORMA CREA*\n\n' +
                '📚 Para información completa sobre CREA y otras herramientas educativas:\n\n' +
                '🔗 https://sites.google.com/hca.edu.uy/herramientas-it/p%C3%A1gina-principal\n\n' +
                '📧 *Soporte técnico:* stem@hca.edu.uy\n\n' +
                'También puedes escribir *5* para enviar una consulta específica.\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        });
                    </script>
                ` : `
                    <div class="qr-container">
                        <p>⏳ Generando código QR...</p>
                        <p><small>Esta página se actualiza automáticamente cada 15 segundos</small></p>
                    </div>
                `}
                
                <div class="info">
                    <h3>📋 Información de Soporte:</h3>
                    <p><strong>📶 WiFi Alumnos:</strong> AlumnosHCA / Alumnos2024</p>
                    <p><strong>📶 WiFi Staff:</strong> HCAndersen / Colegio2024</p>
                    <p><strong>📱 Eventifica:</strong> cédula sin puntos + hca (ej: 12345678hca)</p>
                    <p><strong>💻 SIGED:</strong> Sistema para equipos y más</p>
                    <p><strong>👨‍💻 Soporte:</strong> stem@hca.edu.uy</p>
                    
                    <h4>🔢 Botones Rápidos por WhatsApp:</h4>
                    <ul>
                        <li><strong>1</strong> → WiFi | <strong>2</strong> → Eventifica | <strong>3</strong> → SIGED</li>
                        <li><strong>4</strong> → Humano | <strong>5</strong> → Contactar | <strong>6</strong> → CREA</li>
                        <li><strong>7</strong> → Reportar HDMI | <strong>8</strong> → Reportar Aire | <strong>9</strong> → Reportar TV</li>
                    </ul>
                    
                    <h4>💬 También funciona escribiendo:</h4>
                    <ul>
                        <li><strong>wifi</strong>, <strong>eventifica</strong>, <strong>siged</strong>, <strong>contactar</strong></li>
                        <li><strong>reportar hdmi</strong>, <strong>reportar aire</strong>, <strong>reportar tv</strong></li>
                    </ul>
                </div>
                
                <p><small>Bot de Soporte IT - Hans Christian Andersen</small></p>
            </div>
        </body>
        </html>
    `);
});

// Cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run'
        ],
        headless: true
    }
});

// Almacenar usuarios que quieren contactar directamente
let waitingForMessage = new Set();

// Eventos del cliente
client.on('qr', (qr) => {
    qrString = qr;
    botStatus = '📱 QR listo para escanear';
    console.log('📱 QR generado y disponible en la página web');
    console.log('🌐 Ve a tu URL de Render para escanearlo');
});

client.on('ready', () => {
    botStatus = '✅ Conectado y funcionando';
    qrString = ''; // Limpiar QR una vez conectado
    console.log('✅ Bot HCA conectado y listo!');
});

client.on('authenticated', () => {
    console.log('🔐 WhatsApp autenticado');
});

client.on('auth_failure', (msg) => {
    botStatus = '❌ Error de autenticación';
    console.error('❌ Error de autenticación:', msg);
});

client.on('disconnected', (reason) => {
    botStatus = '🔌 Desconectado';
    console.log('🔌 Desconectado:', reason);
});

// Manejo de mensajes
client.on('message', async (msg) => {
    const text = msg.body.toLowerCase();
    const userNumber = msg.from;
    
    try {
        // Si el usuario está esperando enviar un mensaje directo
        if (waitingForMessage.has(userNumber)) {
            // Reenviar mensaje al administrador
            const contact = await msg.getContact();
            const userName = contact.pushname || contact.number;
            
            await client.sendMessage(ADMIN_NUMBER, 
                `📩 *MENSAJE DIRECTO*\n\n` +
                `👤 *De:* ${userName} (${userNumber.replace('@c.us', '')})\n` +
                `💬 *Mensaje:* ${msg.body}\n\n` +
                `⏰ *Fecha:* ${new Date().toLocaleString('es-UY')}\n\n` +
                `💡 *Nota:* Puedes responder directamente desde WhatsApp.`
            );
            
            await client.sendMessage(userNumber,
                '✅ *Mensaje enviado correctamente*\n\n' +
                'Tu mensaje ha sido enviado al equipo de soporte.\n' +
                'Te responderemos a través de WhatsApp o email.\n\n' +
                '📧 Email de soporte: stem@hca.edu.uy\n\n' +
                'Escribe *menu* para volver a las opciones del bot.'
            );
            
            // Remover usuario de la lista de espera
            waitingForMessage.delete(userNumber);
            return;
        }

        // Respuestas automáticas del bot
        if (text.includes('wifi') || text.includes('internet') || text.includes('contraseña')) {
            await client.sendMessage(msg.from, 
                '📶 *CONTRASEÑAS DE WIFI*\n\n' +
                '👨‍🎓 *Para Alumnos:*\n' +
                '• Red: `AlumnosHCA`\n' +
                '• Contraseña: `Alumnos2024`\n\n' +
                '👨‍🏫 *Para Docentes/Staff:*\n' +
                '• Red: `HCAndersen`\n' +
                '• Contraseña: `Colegio2024`\n\n' +
                '⚠️ *IMPORTANTE:*\n' +
                'No compartir la red HCAndersen con estudiantes.'
            );
        }
        else if (text.includes('eventifica') || text.includes('app')) {
            await client.sendMessage(msg.from,
                '📱 *CÓMO USAR EVENTIFICA*\n\n' +
                '📥 *DESCARGAR LA APP:*\n' +
                'Buscar "Hans Christian Andersen" en Play Store o App Store\n\n' +
                '🔑 *INICIAR SESIÓN:*\n' +
                '• Usuario: tu cédula SIN puntos + hca\n' +
                '• Contraseña: igual que el usuario\n\n' +
                '📝 *EJEMPLO:*\n' +
                'Si tu cédula es 1.234.567-8\n' +
                '• Usuario: `12345678hca`\n' +
                '• Contraseña: `12345678hca`\n\n' +
                '📲 *ENLACES DIRECTOS:*\n' +
                '🤖 Android: https://play.google.com/store/apps/details?id=com.eventifica.hansChristianAndersen\n' +
                '🍎 iOS: https://apps.apple.com/uy/app/hans-christian-andersen-uy/id1624935876'
            );
        }
        else if (text.includes('siged') || text.includes('equipos') || text.includes('sistema')) {
            await client.sendMessage(msg.from,
                '💻 *SISTEMA SIGED - EQUIPOS HCA*\n\n' +
                '🌐 *ACCESO AL SISTEMA:*\n' +
                '🔗 https://siged3.siged.com.uy/sigedxCandersen\n\n' +
                '🔑 *DATOS DE ACCESO:*\n' +
                '• Usuario: tu cédula SIN puntos ni guiones\n' +
                '• Contraseña: tu cédula + un asterisco (*)\n\n' +
                '📝 *EJEMPLO:*\n' +
                'Si tu cédula es 1.234.567-8\n' +
                '• Usuario: `12345678`\n' +
                '• Contraseña: `12345678*`\n\n' +
                '🔧 *REPORTAR PROBLEMAS RÁPIDO:*\n' +
                '📺 *reportar hdmi* → Cable HDMI dañado\n' +
                '❄️ *reportar aire* → Control de aire\n' +
                '📱 *reportar tv* → Control de TV\n\n' +
                '📚 *MÁS INFORMACIÓN:*\n' +
                '🔗 https://sites.google.com/hca.edu.uy/herramientas-it/p%C3%A1gina-principal\n' +
                '(Incluye tutoriales de SIGED, CREA y más herramientas)'
            );
        }
        else if (text.includes('reportar hdmi') || text.includes('hdmi roto') || text.includes('cable hdmi')) {
            await client.sendMessage(msg.from,
                '📺 *REPORTAR CABLE HDMI*\n\n' +
                '🔧 Para reportar problemas con cables HDMI:\n\n' +
                '🌐 *FORMULARIO DE REPORTE:*\n' +
                `🔗 ${FORMULARIO_REPORTES}\n\n` +
                '📝 *Información a completar:*\n' +
                '• Ubicación del problema (ej: Salón 201)\n' +
                '• Descripción detallada del fallo\n' +
                '• Tu nombre y contacto\n\n' +
                '⚡ El reporte será procesado inmediatamente por el equipo técnico.'
            );
        }
        else if (text.includes('reportar aire') || text.includes('aire acondicionado') || text.includes('control aire')) {
            await client.sendMessage(msg.from,
                '❄️ *REPORTAR CONTROL AIRE ACONDICIONADO*\n\n' +
                '🔧 Para reportar problemas con controles de aire:\n\n' +
                '🌐 *FORMULARIO DE REPORTE:*\n' +
                `🔗 ${FORMULARIO_REPORTES}\n\n` +
                '📝 *Información a completar:*\n' +
                '• Ubicación del problema (ej: Aula 105)\n' +
                '• Descripción del fallo del control\n' +
                '• Tu nombre y contacto\n\n' +
                '⚡ El reporte será procesado inmediatamente por el equipo técnico.'
            );
        }
        else if (text.includes('reportar tv') || text.includes('control tv') || text.includes('televisor')) {
            await client.sendMessage(msg.from,
                '📱 *REPORTAR CONTROL TV*\n\n' +
                '🔧 Para reportar problemas con controles de TV:\n\n' +
                '🌐 *FORMULARIO DE REPORTE:*\n' +
                `🔗 ${FORMULARIO_REPORTES}\n\n` +
                '📝 *Información a completar:*\n' +
                '• Ubicación del problema (ej: Salón 304)\n' +
                '• Descripción del fallo del control\n' +
                '• Tu nombre y contacto\n\n' +
                '⚡ El reporte será procesado inmediatamente por el equipo técnico.'
            );
        }
        else if (text.includes('contactar') || text.includes('mensaje') || text.includes('escribir')) {
            waitingForMessage.add(userNumber);
            await client.sendMessage(msg.from,
                '📩 *CONTACTO DIRECTO*\n\n' +
                '✍️ Escribe tu mensaje a continuación y será enviado directamente al equipo de soporte IT.\n\n' +
                '📧 También puedes contactarnos por email:\n' +
                '📮 stem@hca.edu.uy\n\n' +
                '⏰ *Horarios de atención:*\n' +
                '• Lunes a Viernes: 8:00 - 17:00\n\n' +
                '👁️ *Nota:* Todos los mensajes pueden ser vistos y respondidos directamente desde WhatsApp.\n\n' +
                '💡 *Tu próximo mensaje será enviado directamente al administrador.*'
            );
        }
        else if (text.includes('humano') || text.includes('soporte') || text.includes('ayuda técnica')) {
            await client.sendMessage(msg.from,
                '👨‍💻 *SOPORTE TÉCNICO HUMANO*\n\n' +
                '📧 *Email:* stem@hca.edu.uy\n' +
                '⏰ *Horarios:* Lunes a Viernes 8:00-17:00\n\n' +
                '📩 *Mensaje directo:*\n' +
                'Escribe *contactar* para enviar un mensaje directo\n\n' +
                '🔧 *Reportes rápidos:*\n' +
                '• *reportar hdmi* → Cable HDMI\n' +
                '• *reportar aire* → Control aire\n' +
                '• *reportar tv* → Control TV\n\n' +
                '🌐 *Más información:*\n' +
                'https://sites.google.com/hca.edu.uy/herramientas-it/p%C3%A1gina-principal'
            );
        }
        else if (text.includes('hola') || text.includes('menu') || text.includes('inicio') || text.includes('ayuda')) {
            await client.sendMessage(msg.from,
                '🤖 *Bot de Soporte IT - HCA*\n\n' +
                '¡Hola! Soy el asistente de soporte técnico.\n\n' +
                '📋 *Selecciona una opción escribiendo el número:*\n\n' +
                '1️⃣ *WiFi* → Contraseñas de WiFi\n' +
                '2️⃣ *Eventifica* → Cómo usar la app\n' +
                '3️⃣ *SIGED* → Sistema de equipos\n' +
                '4️⃣ *Humano* → Contactar soporte\n' +
                '5️⃣ *Contactar* → Enviar mensaje directo\n' +
                '6️⃣ *CREA* → Plataforma educativa\n\n' +
                '🔧 *Reportes rápidos:*\n' +
                '7️⃣ *Reportar HDMI* → Cable HDMI\n' +
                '8️⃣ *Reportar Aire* → Control aire\n' +
                '9️⃣ *Reportar TV* → Control TV\n\n' +
                '💡 *Escribe el número de la opción que necesitas*\n' +
                '📝 *O escribe directamente: wifi, siged, reportar hdmi, etc.*'
            );
        }
        // Manejo de "botones" numerados
        else if (text === '1' || text.includes('opción 1')) {
            // Redirigir a WiFi
            await client.sendMessage(msg.from, 
                '📶 *CONTRASEÑAS DE WIFI*\n\n' +
                '👨‍🎓 *Para Alumnos:*\n' +
                '• Red: `AlumnosHCA`\n' +
                '• Contraseña: `Alumnos2024`\n\n' +
                '👨‍🏫 *Para Docentes/Staff:*\n' +
                '• Red: `HCAndersen`\n' +
                '• Contraseña: `Colegio2024`\n\n' +
                '⚠️ *IMPORTANTE:*\n' +
                'No compartir la red HCAndersen con estudiantes.\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '2' || text.includes('opción 2')) {
            // Redirigir a Eventifica
            await client.sendMessage(msg.from,
                '📱 *CÓMO USAR EVENTIFICA*\n\n' +
                '📥 *DESCARGAR LA APP:*\n' +
                'Buscar "Hans Christian Andersen" en Play Store o App Store\n\n' +
                '🔑 *INICIAR SESIÓN:*\n' +
                '• Usuario: tu cédula SIN puntos + hca\n' +
                '• Contraseña: igual que el usuario\n\n' +
                '📝 *EJEMPLO:*\n' +
                'Si tu cédula es 1.234.567-8\n' +
                '• Usuario: `12345678hca`\n' +
                '• Contraseña: `12345678hca`\n\n' +
                '📲 *ENLACES DIRECTOS:*\n' +
                '🤖 Android: https://play.google.com/store/apps/details?id=com.eventifica.hansChristianAndersen\n' +
                '🍎 iOS: https://apps.apple.com/uy/app/hans-christian-andersen-uy/id1624935876\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '3' || text.includes('opción 3')) {
            // Redirigir a SIGED
            await client.sendMessage(msg.from,
                '💻 *SISTEMA SIGED - EQUIPOS HCA*\n\n' +
                '🌐 *ACCESO AL SISTEMA:*\n' +
                '🔗 https://siged3.siged.com.uy/sigedxCandersen\n\n' +
                '🔑 *DATOS DE ACCESO:*\n' +
                '• Usuario: tu cédula SIN puntos ni guiones\n' +
                '• Contraseña: tu cédula + un asterisco (*)\n\n' +
                '📝 *EJEMPLO:*\n' +
                'Si tu cédula es 1.234.567-8\n' +
                '• Usuario: `12345678`\n' +
                '• Contraseña: `12345678*`\n\n' +
                '📚 *MÁS INFORMACIÓN:*\n' +
                '🔗 https://sites.google.com/hca.edu.uy/herramientas-it/p%C3%A1gina-principal\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '4' || text.includes('opción 4')) {
            // Redirigir a Humano
            await client.sendMessage(msg.from,
                '👨‍💻 *SOPORTE TÉCNICO HUMANO*\n\n' +
                '📧 *Email:* stem@hca.edu.uy\n' +
                '⏰ *Horarios:* Lunes a Viernes 8:00-17:00\n\n' +
                '📩 *Mensaje directo:*\n' +
                'Escribe *5* para enviar un mensaje directo\n\n' +
                '🌐 *Más información:*\n' +
                'https://sites.google.com/hca.edu.uy/herramientas-it/p%C3%A1gina-principal\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '5' || text.includes('opción 5')) {
            // Redirigir a Contactar
            waitingForMessage.add(userNumber);
            await client.sendMessage(msg.from,
                '📩 *CONTACTO DIRECTO*\n\n' +
                '✍️ Escribe tu mensaje a continuación y será enviado directamente al equipo de soporte IT.\n\n' +
                '📧 También puedes contactarnos por email:\n' +
                '📮 stem@hca.edu.uy\n\n' +
                '⏰ *Horarios de atención:*\n' +
                '• Lunes a Viernes: 8:00 - 17:00\n\n' +
                '👁️ *Nota:* Todos los mensajes pueden ser vistos y respondidos directamente desde WhatsApp.\n\n' +
                '💡 *Tu próximo mensaje será enviado directamente al administrador.*'
            );
        }
        else if (text === '6' || text.includes('opción 6')) {
            // Redirigir a CREA
            await client.sendMessage(msg.from,
                '🎓 *PLATAFORMA CREA*\n\n' +
                '📚 Para información completa sobre CREA y otras herramientas educativas:\n\n' +
                '🔗 https://sites.google.com/hca.edu.uy/herramientas-it/p%C3%A1gina-principal\n\n' +
                '📧 *Soporte técnico:* stem@hca.edu.uy\n\n' +
                'También puedes escribir *5* para enviar una consulta específica.\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '7' || text.includes('opción 7')) {
            // Redirigir a Reportar HDMI
            await client.sendMessage(msg.from,
                '📺 *REPORTAR CABLE HDMI*\n\n' +
                '🔧 Para reportar problemas con cables HDMI:\n\n' +
                '🌐 *FORMULARIO DE REPORTE:*\n' +
                `🔗 ${FORMULARIO_REPORTES}\n\n` +
                '📝 *Información a completar:*\n' +
                '• Ubicación del problema (ej: Salón 201)\n' +
                '• Descripción detallada del fallo\n' +
                '• Tu nombre y contacto\n\n' +
                '⚡ El reporte será procesado inmediatamente por el equipo técnico.\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '8' || text.includes('opción 8')) {
            // Redirigir a Reportar Aire
            await client.sendMessage(msg.from,
                '❄️ *REPORTAR CONTROL AIRE ACONDICIONADO*\n\n' +
                '🔧 Para reportar problemas con controles de aire:\n\n' +
                '🌐 *FORMULARIO DE REPORTE:*\n' +
                `🔗 ${FORMULARIO_REPORTES}\n\n` +
                '📝 *Información a completar:*\n' +
                '• Ubicación del problema (ej: Aula 105)\n' +
                '• Descripción del fallo del control\n' +
                '• Tu nombre y contacto\n\n' +
                '⚡ El reporte será procesado inmediatamente por el equipo técnico.\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else if (text === '9' || text.includes('opción 9')) {
            // Redirigir a Reportar TV
            await client.sendMessage(msg.from,
                '📱 *REPORTAR CONTROL TV*\n\n' +
                '🔧 Para reportar problemas con controles de TV:\n\n' +
                '🌐 *FORMULARIO DE REPORTE:*\n' +
                `🔗 ${FORMULARIO_REPORTES}\n\n` +
                '📝 *Información a completar:*\n' +
                '• Ubicación del problema (ej: Salón 304)\n' +
                '• Descripción del fallo del control\n' +
                '• Tu nombre y contacto\n\n' +
                '⚡ El reporte será procesado inmediatamente por el equipo técnico.\n\n' +
                'Escribe *menu* para volver a las opciones.'
            );
        }
        else {
            // Mensaje no reconocido
            await client.sendMessage(msg.from,
                '🤔 No entendí tu mensaje.\n\n' +
                '📋 *Opciones disponibles:*\n\n' +
                '🔢 *Escribe un número del 1 al 9*\n' +
                '1️⃣ WiFi | 2️⃣ Eventifica | 3️⃣ SIGED\n' +
                '4️⃣ Humano | 5️⃣ Contactar | 6️⃣ CREA\n' +
                '7️⃣ Reportar HDMI | 8️⃣ Reportar Aire | 9️⃣ Reportar TV\n\n' +
                '💬 *O escribe directamente:*\n' +
                '📶 *wifi* | 📱 *eventifica* | 💻 *siged*\n' +
                '👨‍💻 *humano* | 📩 *contactar* | 🎓 *crea*\n' +
                '🔧 *reportar hdmi* | *reportar aire* | *reportar tv*\n\n' +
                'Escribe *menu* para ver todas las opciones.'
            );
        }
    } catch (error) {
        console.error('Error enviando mensaje:', error);
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🌐 Servidor funcionando en puerto ${PORT}`);
    console.log(`📱 Ve a tu URL de Render para escanear el QR`);
});

// Inicializar cliente
console.log('🔄 Inicializando cliente WhatsApp...');
client.initialize();
