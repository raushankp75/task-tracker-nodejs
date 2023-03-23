const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate('user');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const createTask = async (req, res) => {
    // console.log(req.body, "req.body 28 taskController.js")

    const { title, description, status } = req.body;

    const userId = new mongoose.Types.ObjectId(req.params.id);

    console.log(userId, "userId 32 taskController.js")

    try {
        const task = await Task.create({ title, description, status, user: userId });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }

}

const updateTask = async (req, res) => {

    // res.status(200).json({ message: 'Task updated' });
    const taskId = req.params.id;
    const newStatus = req.body.status;

    console.log(taskId, newStatus, "taskId 50 taskController.js")

    try {
        const task = await Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

    // const task = await Task.findByIdAndUpdate(taskId, { status: newStatus }, { new: true });

    // if (!task) {
    //     res.status(404).json({ error: 'Task not found' });
    // }

}





module.exports = { getAllTasks, getTaskById, createTask, updateTask };