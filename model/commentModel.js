const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./userModel');
const Task = require('./taskModel');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
        trim: true,
        maxlength: [500, 'Name can not be more than 500 characters']
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;