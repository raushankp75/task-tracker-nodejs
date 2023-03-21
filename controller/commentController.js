const Comment = require('../model/commentModel');

exports.createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getCommentById = async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
}


module.exports = { createComment, getAllComments, getCommentById };







