import { request, response } from "express";
import JWT from "jsonwebtoken";

const validar_token = ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(404).json({
            message: 'Debe iniciar sesion'
        });  
    }
    try {
        const payload = JWT.verify( token, "ThisIsMySecretKey");
        req.usuario = payload;
        
        next();
    } catch( err ) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

export default validar_token;