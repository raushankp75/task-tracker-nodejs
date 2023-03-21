const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken');


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
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
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, "SECRETKEY");

    console.log(decoded, "decoded 28")


    try {
        // const task = await Task.create(req.body);
        const task = await Task.create({ ...req.body, user: decoded.id });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { getAllTasks, getTaskById, createTask };