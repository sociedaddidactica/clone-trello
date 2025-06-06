const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then(() => {
    console.log('✅ Conexión exitosa a MySQL');
  })
  .catch((err) => {
    console.error('❌ Error de conexión con MySQL:', err);
  });

module.exports = pool;

