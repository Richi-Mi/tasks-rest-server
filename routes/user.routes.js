import { Router, response } from "express";
import { UserDB } from "../database/database.js";
import generar_token from "../helpers/generarJWT.js";
import validar_token from "../helpers/validar_jwt.js";

const user_db = new UserDB();
const router = Router()

// Route terminated 
router.post('/create', async (req, res) => {
    const { username, password } = req.body

    const result = await user_db.create_user( username, password );

    if( result ) {
        res.status(201).json({
            message: 'Your account has been registred, so please log in the next form'
        });
    }
    else {
        res.status(400).json({
            message: `The user ${ username } has an account`
        })
    }
});

// Route terminated
router.post('/login', async (req, res) => {

    const { username, password } = req.body

    const result = await user_db.login( username, password );

    result ? res.status(200).json({
        message: `You have loged`,
        token: await generar_token( username )
    }) : res.status(400).json({
        message: `Error, please check your username and password`
    });
});

// Route terminated 
router.get('/info/:id', [
    validar_token
],
async (req, res = response ) => {
    const { id } = req.params;
    const info = await user_db.get_info( id );

    if( !(info == null) ) {
        const [ data ] = info
        res.status(200).json( data );
    }
    else {
        res.status(400).json({
            message: `Error, please check your username`
        })
    }
});

export default router;