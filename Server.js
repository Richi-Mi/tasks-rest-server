import express from 'express';

import user_routes from './routes/user.routes.js';

class Server {
    constructor() {
        this.app = express()

        this.rutas = {
            user: '/api/user',
            tasks: '/api/task'
        }
        this.middlewares()
        this.routes()
    }

    middlewares() {
        // Parseo del Body a formato JSON.
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.rutas.user, user_routes );
    }

    listen() {
        // Corre el servidor en el puerto 8080
        this.app.listen( 8080, () => {
            console.log("Server conected on PORT: 8080");
        } );
    }
}

export default Server;