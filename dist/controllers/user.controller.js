import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
export const registration = async (request, response, next) => {
    const userData = request.body;
    try {
        const checkUser = await User.findOne({ email: userData.email });
        if (checkUser) {
            response.status(401).json({
                success: false,
                message: "User Already exists"
            });
        }
        else {
            const hashedPassword = await bcrypt.hash(userData.password, 13);
            const user = await User.create({
                ...userData,
                password: hashedPassword
            });
            user.password = undefined;
            response.status(201).json({
                data: user,
                success: true,
                message: `Successfully created user: ${user.firstName} ${user.lastName}`
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const loggingIn = async (request, response, next) => {
    const logInData = request.body;
    try {
        const user = await User.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                const secret = process.env.JWT_SECRET;
                const dataStoredInToken = {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    role: user.role
                };
                const token = jwt.sign(dataStoredInToken, secret, { expiresIn: "7d" });
                user.password = "";
                response.status(200).json({
                    data: user,
                    success: true,
                    message: `Login Successfull`,
                    token: token
                });
            }
            else {
                response.status(401).json({
                    success: false,
                    message: "Username or Password incorrect"
                });
            }
        }
        else {
            response.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getUser = async (request, response, next) => {
    try {
        const user = await User.findOne({ _id: request.params.id });
        if (user) {
            response.status(200).json({
                data: user,
                success: true,
                message: `Successfull`
            });
        }
        else {
            response.status(401).json({
                success: false,
                message: "User not found"
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getUsers = async (request, response, next) => {
    const { pageSize, page } = request.params;
    try {
        const user = await User.find({ _id: request.params.id })
            .select("-password")
            .limit(pageSize ? +pageSize : 30)
            .skip((+page - 1) * +pageSize)
            .exec();
        if (user) {
            response.status(200).json({
                data: user,
                success: true,
                message: `Successfull`
            });
        }
        else {
            response.status(401).json({
                success: false,
                message: "User not found"
            });
        }
    }
    catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//# sourceMappingURL=user.controller.js.map