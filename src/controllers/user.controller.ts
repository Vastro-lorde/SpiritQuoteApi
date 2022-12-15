import * as express from 'express';
import bcrypt from "bcrypt";
import CreateUserDto from '../_helpers/UserDtos/CreateUserDto.js';
import User from "../models/user.js";

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