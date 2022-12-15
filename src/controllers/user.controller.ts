import * as express from 'express';
import bcrypt from "bcrypt";
import CreateUserDto from '../_helpers/UserDtos/CreateUserDto.js';
import User from "../models/user.js";
import LogInDto from '../_helpers/UserDtos/LogInDto.js';
import jwt from "jsonwebtoken";
import DataStoredInToken from '../_helpers/DataStoredIntoken.js';

export const registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
        const checkUser = await User.findOne({ email: userData.email })
        if (checkUser){
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
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
          });
    }
  }


export const loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: LogInDto = request.body;
    try {
        const user = await User.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                const secret = process.env.JWT_SECRET;
                const dataStoredInToken: DataStoredInToken = {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    role: user.role
                  };
                const token = jwt.sign(dataStoredInToken,secret,{expiresIn:"7d"});
                user.password = "";
                response.status(200).json({
                data: user,
                success: true,
                message: `Login Successfull`,
                token: token 
              });
            } else {
                response.status(401).json({
                    success: false,
                    message: "Username or Password incorrect"
                  });
            }
          } else {
            response.status(404).json({
                success: false,
                message: "User not found"
              });
          }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message,
          });
    }
}