import express from "express";
import { getUser, loggingIn, registration } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send("Spirit Quotes");
});
router.post('/register', registration);
router.post('/login', loggingIn);
router.get('/user/:id', auth, getUser);
export default router;
//# sourceMappingURL=index.route.js.map