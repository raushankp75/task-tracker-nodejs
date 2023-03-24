const User = require('../model/userModel');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_name,
    api_secret: process.env.api_secret
});


// Get a list of all users
const getAllUsers = async (req, res) => {
    try {
        // Sending all users
        const users = await User.find({}).select('-password -tasks -role');

        // excluding admin from the list
        // const users = await User.find({ role: { $ne: 'ADMIN' } }).select('-password -tasks -role');
        // console.log(users, "users 14 userController.js")
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


// Get a single user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


// Create a new user
const createUser = async (req, res) => {



    // console.log(req.body, "req.body 14 userController.js")
    const { user } = req.body;
    console.log(user)
    // const profileImg = req.files.profileImg;
    // console.log(profileImg, "profileImg 14 userController.js")

    // const profileImgResponse = await cloudinary.uploader.upload(profileImg.tempFilePath, {
    //     upload_preset: 'task-tracker'
    // });

    // console.log(profileImgResponse, "profileImgResponse 14 userController.js")

    // const newUserData = {
    //     ...user,
    //     // profileImage: profileImageUploadResult.secure_url,
    //     profileImg: profileImgResponse.secure_url
    // };



    try {
        const userDetail = await User.create(JSON.parse(user));
        res.status(200).json(userDetail);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { getAllUsers, getUserById, createUser };
