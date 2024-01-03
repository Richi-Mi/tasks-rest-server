import { Router } from "express";

const router = Router()

router.post("/add", (req, res) => {
    res.send('Add');
});

router.delete("/delete/:id", ( req, res ) => {
    res.send('Delete');
});

router.put("/complete/:id", ( req, res ) => {
    res.send('Complete');
});

router.get("/get_tasks/:category", (req, res) => {
    res.send('Your tasks');
});

export default router;