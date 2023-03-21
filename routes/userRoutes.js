const express = require('express');
const router = express.Router();


// const router = express.Router();
const { getAllUsers, getUserById, createUser, loginUser } = require('../controller/userController');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);


module.exports = router;