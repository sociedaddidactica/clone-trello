const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createList, getListsByBoard } = require('../controllers/listController');

// POST /boards/:id/lists → Crea lista en un tablero
router.post('/boards/:id/lists', verifyToken, (req, res, next) => {
  req.body.boardId = req.params.id; // Pasar el boardId como parte del body
  next();
}, createList);

// GET /boards/:boardId/lists → Obtener listas del tablero
router.get('/boards/:boardId/lists', verifyToken, getListsByBoard);

module.exports = router;
