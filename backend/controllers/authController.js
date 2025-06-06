const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica si ya existe
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hashea la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserta el usuario
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado correctamente 🎉' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login real
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [userResult] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (userResult.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = userResult[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Ruta protegida
exports.getProtected = (req, res) => {
  res.status(200).json({
    message: '🎉 Acceso autorizado a ruta protegida',
    user: req.user,
  });
};

