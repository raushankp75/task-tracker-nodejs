const Comment = require('../model/commentModel');
const Task = require('../model/taskModel');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;



const createComment = async (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, "SECRETKEY");

    // console.log(decoded, "decoded 9 commentController.js")

    const taskID = new mongoose.Types.ObjectId(req.params.id);


    try {

        const comment = new Comment({ ...req.body, user: decoded.id, task: taskID });

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({}).populate('user').select('_id comment user.name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// tasks/${id}/comments

const gatCommentByTaskId = async (req, res, next) => {

    console.log(req.params.id, "req.params.id 56 commentController.js")

    const taskID = new mongoose.Types.ObjectId(req.params.id);

    try {
        const comments = await Comment.find({ task: taskID }).populate({
            path: 'user',
            select: 'name',
            model: User
        })


        console.log(comments, "comments 56 commentController.js")
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}



const getCommentById = async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
}


module.exports = { createComment, getAllComments, getCommentById, gatCommentByTaskId };







