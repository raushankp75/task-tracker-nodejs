const express = require('express');
const router = express.Router();


const { getAllComments, getCommentById, createComment, gatCommentByTaskId } = require('../controller/commentController');

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments/:id', createComment);
router.get('/tasks/:id/comments', gatCommentByTaskId);

module.exports = router;