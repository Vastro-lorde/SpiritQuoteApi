import JWT from 'jsonwebtoken';
export const auth = async (req, res, next) => {
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
};
export const authAdmin = async (req, res, next) => {
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
};
//# sourceMappingURL=auth.js.map