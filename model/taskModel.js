const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./userModel');
const Comment = require('./commentModel');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
        maxlength: [500, 'Name can not be more than 500 characters']
    },
    status: { type: String, enum: ['TODO', 'INPROGRESS', 'DONE'], default: 'TODO' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Task = mongoose.model('Task', taskSchema);