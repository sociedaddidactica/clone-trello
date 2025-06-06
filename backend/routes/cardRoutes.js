const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createCard } = require('../controllers/cardController');

router.post('/cards', verifyToken, createCard);

module.exports = router;
