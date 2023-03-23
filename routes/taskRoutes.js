const express = require('express');
const router = express.Router();

const { getAllTasks, getTaskById, createTask, updateTask, createTaskAdmin } = require('../controller/taskController');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.post('/admin/task', createTaskAdmin);

module.exports = router;