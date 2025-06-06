const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createBoard, getBoards } = require('../controllers/boardController');

// Crear un nuevo tablero (protegido)
router.post('/boards', verifyToken, createBoard);

// Obtener todos los tableros del usuario (protegido)
router.get('/boards', verifyToken, getBoards);

module.exports = router;




