const express = require('express');
const router = express.Router();

const { getAllTasks, getTaskById, createTask, updateTask, createTaskAdmin, updateTaskAdmin } = require('../controller/taskController');
const { TotalTaskByAnUser } = require('../controller/dashboardController');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.post('/admin/task', createTaskAdmin);
router.get('/status', TotalTaskByAnUser);
router.put('/tasks/admin/:id', updateTaskAdmin);


module.exports = router;