import express from "express";
import { registration } from "../controllers/user.controller.js";
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send("Spirit Quotes");
});


router.get('/register', registration);


export default router;