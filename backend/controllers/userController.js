import AppError from '../middleware/appError.js';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        if (!user.active) return next(new AppError('The account is no longer active', 401))

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set JWT as an HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        });

        res.json({
            _id: user._id,
            fullName: user.fullName,
            nationalID: user.nationalID,
            nationality: user.nationality,
            countryFlag: user.countryFlag,
            photo: user?.photo,
            email: user.email,
            isAdmin: user.isAdmin,
            active: user.active
        });

    } else {
        return next(new AppError('Invalid email or password', 401))
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, nationalID, nationality, countryFlag, email, password } = req.body;
    console.log(req.body)

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('User already exists', 400))
    }

    const user = await User.create({
        fullName,
        nationalID,
        nationality,
        countryFlag,
        // photo,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            nationalID: user.nationalID,
            nationality: user.nationality,
            countryFlag: user.countryFlag,
            // photo: user.photo,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        return next(new AppError('Invalid user data', 400))
    }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            nationalID: user.nationalID,
            nationality: user.nationality,
            countryFlag: user.countryFlag,
            photo: user?.photo,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        return next(new AppError('User not found', 404))
    }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
    const { _id, fullName, email, photo, nationalID } =
        req.body;

    const user = await User.findById(_id);

    if (user) {
        if (req.body.fullName !== undefined) {
            user.fullName = fullName;
        }

        if (req.body.email !== undefined) {
            user.email = email;
        }

        if (req.body.nationalID !== undefined) {
            user.nationalID = nationalID;
        }

        // Nếu có image mới được cung cấp, thì cập nhật image
        if (req.body.photo) {
            user.photo = `${photo.replace(/\\/g, '/')}`;
        }

        if (req.body.password !== undefined) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            nationalID: updatedUser.nationalID,
            nationality: updatedUser.nationality,
            countryFlag: updatedUser.countryFlag,
            photo: updatedUser.photo,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        return next(new AppError('User not found', 404))
    }
});


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});
// @desc    Delete user
// @route   PATCH /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    console.log(user)

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Can not delete admin user');
        }
        user.active = false;

        const updatedUser = await user.save();

        res.json({ message: 'User isn\'t actived' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.nationalID = req.body.nationalID || user.nationalID;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            nationalID: updateUser.nationalID,
            isAdmin: updateUser.isAdmin,
            active: updateUser.active
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
