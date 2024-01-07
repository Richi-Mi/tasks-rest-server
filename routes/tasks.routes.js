import { Router, request, response } from "express";
import validar_token from "../helpers/validar_jwt.js";
import { TaskDB } from "../database/database.js";

const router = Router()
const tasks_db = new TaskDB();

router.post("/add", validar_token, async (req = request, res = response ) => {
    const { task } = req.body
    const { clave } = req.usuario

    const created = await tasks_db.add_task( task, clave);

    created ? res.status( 201 ).send("Note saved") : res.status(500).send("Internal Server Error")
});

router.put("/complete/:id", validar_token, async ( req, res ) => {
    const { id } = req.params
    const updated = await tasks_db.complete_task( id )

    updated ? res.status( 201 ).send("Note updated") : res.status(500).send("Internal Server Error")
});

router.get("/get_tasks/:category", validar_token, async (req, res) => {
    const { category } = req.params
    const { clave } = req.usuario

    const result = await tasks_db.get_taks( clave, category )
    res.status(200).json( result )

});

export default router;