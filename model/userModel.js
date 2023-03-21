const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [30, 'Name can not be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    mobile: { type: String, required: [true, 'Please add a mobile number'] },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        // minlength: 6,
        // select: false
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;

