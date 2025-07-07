const express = require('express');
const bodyParser = require('body-parser');
const wordRoutes = require('./routes/wordRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar rutas auth
const session = require('express-session');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar sesión ANTES de usar rutas
app.use(session({
  secret: 'clave-secreta-muy-segura', // cambia esta clave
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hora
}));

// Usar rutas de autenticación primero
app.use(authRoutes);

// Luego las rutas del glosario
app.use('/', wordRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
