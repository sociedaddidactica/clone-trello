const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

// Rutas
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const listRoutes = require('./routes/listRoutes');
const cardRoutes = require('./routes/cardRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 🔗 Rutas de la API
app.use('/api', authRoutes);     // Login, register
app.use('/api', boardRoutes);    // Boards
app.use('/api', listRoutes);     // Lists
app.use('/api', cardRoutes);     // Cards
app.use('/api', taskRoutes);     // Tasks

// ✅ Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor corriendo 🎉');
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express iniciado en puerto ${PORT}`);
});

// ⚠️ Manejo de errores globales
process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Promesa rechazada sin capturar:', err.message);
  process.exit(1);
});

