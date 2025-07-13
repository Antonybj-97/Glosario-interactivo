const express = require('express');
const bodyParser = require('body-parser');
const wordRoutes = require('./routes/wordRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesión para producción
app.use(session({
  secret: process.env.SESSION_SECRET || 'clave-secreta-backup', // Usa variable de entorno
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 3600000, // 1 hora
    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
    sameSite: 'lax'
  }
}));

// Rutas
app.use(authRoutes);
app.use('/', wordRoutes);

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
