import { Router } from "express";
import { UserDB } from "../database/database.js";

const router = Router()

router.post('/create', (req, res) => {
    const user_db = new UserDB();

    user_db.create_user("richi_pai", "12345678");

    res.send("XD");
});

router.post('/login', (req, res) => {
    res.send('Login');
});

router.post('/info/:id', (req, res) => {
    res.send('Info');
});

export default router;