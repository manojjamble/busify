const asyncHandler = require('express-async-handler');const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc Get all users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler( async (req, res) => {
   const users = await User.find({})
   .populate('bookings');
    res.status(200).json({ message: "Success",  users } );
});

//@desc Get user by ID
//@route GET /api/users/
//@access Public
const getUser = asyncHandler( async (req, res) => {
     const userId = req.user.id;
    const user = await User.findOne({ _id: userId})
    .populate('bookings');
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler( async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({user :{ 
            id: user._id ,
            name: user.name,
            email: user.email,
            role: user.role
        }}, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' });
        // Send the token in the response
        res.setHeader('Set-Cookie', token);
        res.status(200).json({message: 'Success',
            user, token    
        });
    } else {
        res.status(401).json({message: 'Invalid email or password'});
    }
});

//@desc Register user
//@route POST /api/users
//@access Public
const createUser = asyncHandler( async (req, res) => {
    let newUser = req.body;
    const password = newUser.password;
    newUser.password = bcrypt.hashSync(password, 10);
    const user = await User.create(newUser);
    res.status(200).json({message: 'Success',
        user    
    });
});

//@desc Update user
//@route PUT /api/users/
//@access Public
const updateUser = asyncHandler( async (req, res) => {
    const userId = req.user.id;
    const updatedData = req.body;
    const user = await User.findOneAndUpdate(
        { _id: userId }, 
        updatedData, 
        { new: true });
    res.status(200).json({message: 'User data updated Successfully.', user})
});

//@desc Delete user
//@route DELETE /api/users/
//@access Public
const deleteUser = asyncHandler( async (req, res) => {
    const userId = req.user.id;
    const user = await User.findOneAndDelete({ _id: userId });
    res.status(200).json({message: 'User deleted Successfully.', user});
});

module.exports = { getUsers, getUser, loginUser, createUser, updateUser, deleteUser };
