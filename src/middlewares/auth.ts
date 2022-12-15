import JWT from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import IUserInfoInRequest from '../_helpers/getUserInfoInRequest.js';

export const auth = async (req: IUserInfoInRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = decoded.user;
        if (!user) throw new Error("User not found");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

export const authAdmin = async (req: IUserInfoInRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = decoded.user;
        if (!user) throw new Error("User not found");
        if (user.role !== "Admin") throw new Error("You are not authorized");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}