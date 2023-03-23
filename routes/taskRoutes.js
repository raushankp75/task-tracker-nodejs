const express = require('express');
const router = express.Router();

const { getAllTasks, getTaskById, createTask, updateTask } = require('../controller/taskController');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks/:id', createTask);
router.put('/tasks/:id', updateTask);

module.exports = router;