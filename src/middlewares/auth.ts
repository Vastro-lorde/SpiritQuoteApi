import JWT from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import IUserInfoInRequest from '../_helpers/getUserInfoInRequest.js';
import DataStoredInToken from '../_helpers/DataStoredIntoken.js';
import User from "../models/user.js";

export const auth = async (req: IUserInfoInRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = JWT.verify(token, process.env.JWT_SECRET) as DataStoredInToken;
        const user = decoded;
        if (!user) throw new Error("User not found");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

export const authRoles =(...Roles)=> {
        return async (req: IUserInfoInRequest, res: Response, next: NextFunction) => {
        try {
            const userRole = req.user.role;
            const authRoles = [...Roles];
            const result = authRoles.includes(userRole);
            if(!result) return res.status(401).send({ error: 'User not allowed.' });
            next();
        } catch (error) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
} 