import express from "express";
import { getUser, loggingIn, registration } from "../controllers/user.controller.js";
import { auth, authRoles } from "../middlewares/auth.js";
import Role from "../_helpers/role.js";
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send("Spirit Quotes");
});


router.post('/register', registration);
router.post('/login', loggingIn);
router.get('/user/:id',auth, authRoles(Role.User,Role.Admin), getUser);


export default router;