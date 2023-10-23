import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import AppError from "./appError.js";


// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie (.jwt vì res.cookie('jwt',...))
    token = req.cookies.jwt;

    if (token) {
        try {
            //Giải mã
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Thiết lập thông tin người dùng đã xác thực
            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);
            return next(new AppError("Not authorized, token failed", 401))
        }
    } else {
        return next(new AppError("Not authorized, no token", 401))
    }
});

// User must be an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return next(new AppError("Not authorized as an admin", 401))
    }
};

export { protect, admin };
