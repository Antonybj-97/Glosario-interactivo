const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL ? JSON.parse(process.env.DB_SSL) : null,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Verificación de conexión
pool.getConnection()
  .then(connection => {
    console.log('✅ Conexión exitosa a MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL:', err.message);
    console.error('Configuración usada:', {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database
    });
    process.exit(1);
  });

module.exports = pool;
