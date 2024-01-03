import JWT from "jsonwebtoken";

const generar_token = ( clave ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { clave };

        JWT.sign( 
            payload, 
            "ThisIsMySecretKey", 
            {
                expiresIn: '4h'
            },
            (err, token) => {
                if( err )  reject( err );
                else resolve( token );
        });
    })
}

export default generar_token;