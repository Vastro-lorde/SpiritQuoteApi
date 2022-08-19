var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JWT from 'jsonwebtoken';
export const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = decoded.user;
        if (!user)
            throw new Error("User not found");
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
});
export const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = decoded.user;
        if (!user)
            throw new Error("User not found");
        if (user.role !== "Admin")
            throw new Error("You are not authorized");
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
});
//# sourceMappingURL=auth.js.map