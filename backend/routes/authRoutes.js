const express = require('express');
const router = express.Router();
const { login, register, getProtected } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', register); // Nueva ruta
router.post('/login', login);
router.get('/protected', verifyToken, getProtected);

module.exports = router;


