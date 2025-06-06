const db = require('../config/db');

// Crear una nueva tarjeta en una lista
exports.createCard = async (req, res) => {
  const { listId, title, description } = req.body;
  const userId = req.user.id;

  try {
    // Verifica que la lista le pertenece al usuario
    const [lists] = await db.query(`
      SELECT l.id 
      FROM lists l
      JOIN boards b ON l.board_id = b.id
      WHERE l.id = ? AND b.user_id = ?
    `, [listId, userId]);

    if (lists.length === 0) {
      return res.status(403).json({ error: 'No tienes permiso para agregar tareas a esta lista' });
    }

    // Insertar nueva tarjeta
    const [result] = await db.query(
      'INSERT INTO cards (list_id, title, description) VALUES (?, ?, ?)',
      [listId, title, description]
    );

    res.status(201).json({
      message: '📌 Tarjeta creada correctamente',
      cardId: result.insertId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear tarjeta' });
  }
};
