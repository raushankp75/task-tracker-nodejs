const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../model/userModel');
const { GetIdAuth } = require('../utils/GetIdAuth');
const ObjectId = mongoose.Types.ObjectId;


const getAllTasks = async (req, res) => {
    try {
        // const tasks = await Task.find({}).populate('user');

        const tasks = await Task.find({}).populate({
            path: 'user',
            select: 'name ',
            model: User
        })
        // .select('_id title description status user.name');
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

const getTaskByUserToken = async (req, res) => {

    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, "SECRETKEY");

    // console.log(decoded, "decoded 31 commentController.js")
    try {

        const task = await Task.findById({ user: decoded.id });
        // console.log(task, "task 35 commentController.js")
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const createTask = async (req, res) => {
    // console.log(req.body, "req.body 28 taskController.js")

    const { title, description } = req.body;

    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, "SECRETKEY");
    const userId = decoded.id;


    // console.log(userId, "userId 59 taskController.js")

    try {
        const isUser = await User.findById(decoded.id);

        if (isUser) {
            const task = await Task.create({ title, description, user: userId });
            res.status(200).json(task);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }

}

const createTaskAdmin = async (req, res) => {
    // console.log(req.body, "req.body 28 taskController.js")

    console.log("req.body 28 taskController.js")

    const { title, description, user } = req.body;

    console.log(user, "user 28 taskController.js")

    try {
        const task = await Task.create({ title, description, user: user });

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
}




// For draging and dropping the task && for user only can move own task

const updateTask = async (req, res) => {

    // res.status(200).json({ message: 'Task updated' });

    const UserId = new ObjectId(GetIdAuth(req));

    // console.log(UserId, "UserId 28 taskController.js")

    const taskId = req.params.id;
    const newStatus = req.body.status;


    // const TaskByThisUser = await Task.findById({ user: UserId })

    // console.log(TaskByThisUser, "TaskByThisUser 28 taskController.js")


    const currentTaskStatus = await Task.findById(taskId);

    console.log(currentTaskStatus.user, "currentTaskStatus 28 taskController.js")
    console.log(UserId, "UserId 28 taskController.js")

    try {

        if (currentTaskStatus.status === "DONE") {
            res.status(400).json({ message: 'DONE task cannot be updated' });
        }

        else if (!currentTaskStatus.user.equals(UserId)) {
            res.status(400).json({ message: 'You cannot update other user task' });
        }

        else {
            const task = await Task.findByIdAndUpdate(taskId, { status: newStatus },
                { new: true });
            res.status(200).json({ task, message: 'Task updated' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


// For Admin
const updateTaskAdmin = async (req, res) => {

    // res.status(200).json({ message: 'Task updated' });
    const taskId = req.params.id;
    const newStatus = req.body.status;


    try {


        const task = await Task.findByIdAndUpdate(taskId, { status: newStatus },
            { new: true });
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { getAllTasks, getTaskById, createTask, updateTask, getTaskByUserToken, createTaskAdmin, updateTaskAdmin };