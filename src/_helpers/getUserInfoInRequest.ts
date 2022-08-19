import { Request } from "express";

export default interface IUserInfoInRequest extends Request {
    user: {
        id: string;
        role: string;
    };
}