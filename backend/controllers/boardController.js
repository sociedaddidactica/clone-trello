const db = require('../config/db');

// Crear un nuevo tablero
exports.createBoard = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const [result] = await db.query(
      'INSERT INTO boards (user_id, name, description) VALUES (?, ?, ?)',
      [userId, name, description]
    );

    res.status(201).json({
      message: 'Tablero creado correctamente 🧩',
      boardId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el tablero' });
  }
};

// Obtener tableros del usuario
exports.getBoards = async (req, res) => {
  const userId = req.user.id;

  try {
    const [boards] = await db.query(
      'SELECT * FROM boards WHERE user_id = ?',
      [userId]
    );

    res.status(200).json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tableros' });
  }
};

