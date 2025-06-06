const db = require('../config/db');

// Obtener todas las tareas de un tablero
exports.getTasksByBoard = async (req, res) => {
  const boardId = req.params.id;
  console.log("📥 [getTasksByBoard] Petición recibida para boardId:", boardId);

  try {
    const [results] = await db.query(
      `SELECT cards.* FROM cards
       JOIN lists ON cards.list_id = lists.id
       WHERE lists.board_id = ?`,
      [boardId]
    );

    console.log("✅ Tareas encontradas:", results.length);
    res.json(results);
  } catch (err) {
    console.error("❌ Error al obtener tareas:", err.message);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// Crear una nueva tarea en un tablero (asignada a la primera lista)
exports.createTaskInBoard = async (req, res) => {
  const boardId = req.params.id;
  const { title, description, status } = req.body;

  console.log('📩 Intentando crear tarea');
  console.log('📦 Datos recibidos:', { title, description, status });

  // Validaciones
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'El campo "title" es obligatorio.' });
  }

  if (description === undefined) {
    return res.status(400).json({ error: 'El campo "description" es obligatorio.' });
  }

  const allowedStatus = ['pendiente', 'en progreso', 'completada'];
  if (!status || !allowedStatus.includes(status)) {
    return res.status(400).json({ error: 'El campo "status" debe ser: "pendiente", "en progreso" o "completada".' });
  }

  try {
    console.log('🔎 Buscando lista para boardId:', boardId);
    const [listRows] = await db.query(
      'SELECT id FROM lists WHERE board_id = ? ORDER BY id ASC LIMIT 1',
      [boardId]
    );

    if (listRows.length === 0) {
      console.warn('⚠️ No se encontró lista para el board:', boardId);
      return res.status(404).json({ error: 'No list found for this board' });
    }

    const listId = listRows[0].id;
    console.log('📋 Lista encontrada con ID:', listId);

    const [insertResult] = await db.query(
      'INSERT INTO cards (list_id, title, description, status) VALUES (?, ?, ?, ?)',
      [listId, title, description, status]
    );

    console.log('✅ Tarea creada con ID:', insertResult.insertId);
    res.status(201).json({ message: 'Task created', taskId: insertResult.insertId });
  } catch (err) {
    console.error('❌ Error al crear tarea:', err.message);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

// Actualizar tarea
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  console.log('🔧 Actualizando tarea:', taskId);
  console.log('📦 Nuevos datos:', { title, description, status });

  // Validaciones
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'El campo "title" es obligatorio.' });
  }

  if (description === undefined) {
    return res.status(400).json({ error: 'El campo "description" es obligatorio.' });
  }

  const allowedStatus = ['pendiente', 'en progreso', 'completada'];
  if (!status || !allowedStatus.includes(status)) {
    return res.status(400).json({ error: 'El campo "status" debe ser: "pendiente", "en progreso" o "completada".' });
  }

  try {
    const [result] = await db.query(
      'UPDATE cards SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, taskId]
    );

    console.log('✅ Tarea actualizada:', taskId);
    res.json({ message: 'Task updated' });
  } catch (err) {
    console.error('❌ Error al actualizar tarea:', err.message);
    res.status(500).json({ error: 'Error updating task' });
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM cards WHERE id = ?', [taskId]);
    console.log('🗑️ Tarea eliminada:', taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('❌ Error al eliminar tarea:', err.message);
    res.status(500).json({ error: 'Error deleting task' });
  }
};
