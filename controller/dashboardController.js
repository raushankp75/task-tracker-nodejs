const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../model/userModel');
const ObjectId = require('mongoose').Types.ObjectId;


const TotalTaskByAnUser = async (req, res) => {


    // const tasks = await Task.find({})


    try {
        const userTaskCounts = [];
        const users = await User.find({});

        for (const user of users) {
            const userTasks = await Task.find({ user: new ObjectId(user._id) });
            // console.log(userTasks, 'userTasks')


            const todoCount = userTasks.filter(task => task.status === 'TODO').length;
            const inprogressCount = userTasks.filter(task => task.status === 'INPROGRESS').length;
            const doneCount = userTasks.filter(task => task.status === 'DONE').length;

            userTaskCounts.push({
                user: user.name,
                todoCount,
                inprogressCount,
                doneCount
            });



        }
        res.status(200).json(userTaskCounts);


    } catch (error) {
        res.status(500).json({ error: 'Server error', status: false });
    }

}


module.exports = { TotalTaskByAnUser };