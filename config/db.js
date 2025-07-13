if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mysql = require('mysql2/promise'); // Usa la versión promise-based

// Configuración mejorada para producción
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Ajusta según tus necesidades
  queueLimit: 0,
  ssl: process.env.DB_SSL ? JSON.parse(process.env.DB_SSL) : null, // Necesario para PlanetScale
  connectTimeout: 10000 // 10 segundos de timeout
});

// Verificación de conexión
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a la base de datos MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a la BD:', err);
    process.exit(1); // Termina la aplicación si no puede conectar
  });

module.exports = pool;
