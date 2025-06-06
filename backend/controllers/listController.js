const db = require('../config/db');

// Crear una nueva lista en un tablero
exports.createList = async (req, res) => {
  const { boardId, name } = req.body;
  const userId = req.user.id;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'El nombre de la lista es obligatorio' });
  }

  try {
    const [boards] = await db.query(
      'SELECT * FROM boards WHERE id = ? AND user_id = ?',
      [boardId, userId]
    );

    if (boards.length === 0) {
      return res.status(403).json({ error: 'No tienes permiso para agregar listas a este tablero' });
    }

    const [result] = await db.query(
      'INSERT INTO lists (board_id, name, user_id) VALUES (?, ?, ?)',
      [boardId, name, userId]
    );

    res.status(201).json({
      message: '✅ Lista creada correctamente',
      listId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la lista' });
  }
};

// Obtener listas por tablero
exports.getListsByBoard = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user.id;

  try {
    const [lists] = await db.query(
      'SELECT * FROM lists WHERE board_id = ? AND user_id = ?',
      [boardId, userId]
    );

    res.status(200).json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las listas' });
  }
};
