const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // 

const {
  getTasksByBoard,
  createTaskInBoard,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

console.log({
  getTasksByBoard,
  createTaskInBoard,
  updateTask,
  deleteTask,
  verifyTokenType: typeof verifyToken
});

// Rutas
router.get('/boards/:id/tasks', verifyToken, getTasksByBoard);
router.post('/boards/:id/tasks', verifyToken, createTaskInBoard);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;




