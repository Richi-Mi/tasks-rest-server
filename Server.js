import express from 'express';

import user_routes from './routes/user.routes.js';
import task_routes from './routes/tasks.routes.js';
import cors from 'cors';

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
        // USO DE CORS 
        this.app.use( cors() )
    }

    routes() {
        this.app.use( this.rutas.user, user_routes );
        this.app.use( this.rutas.tasks, task_routes );
    }

    listen() {
        // Corre el servidor en el puerto 8080
        this.app.listen( 8080, () => {
            console.log("Server conected on PORT: 8080");
        } );
    }
}

export default Server;