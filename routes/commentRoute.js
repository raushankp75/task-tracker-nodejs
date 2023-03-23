const express = require('express');
const router = express.Router();


const { getAllComments, getCommentById, createComment } = require('../controller/commentController');

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments/:id', createComment);

module.exports = router;