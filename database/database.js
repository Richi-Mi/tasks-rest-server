import mysql from 'mysql';
import { encriptar } from '../encript.js';

class DataBase {
    constructor() {
        this.pool = mysql.createPool({
            user: 'root',
            password: 'Jose1914;',
            host: 'localhost',
            port: '3306',
            database: 'tasks_db'
        });
    }

    consulta( query ) {
        return new Promise( ( resolve, reject ) => {
            this.pool.getConnection( (err, connection ) => {
                if( err ) throw new Error(err);
    
                connection.query( query, (err, result) => {
                    if( err ) reject( err );
                    resolve( result );
                } );

                connection.release();
            });
        });
    }
}

export class UserDB extends DataBase {
    
    constructor() {
        super()
        this.collection = 'user'
    }

    async create_user( username, password ) {
        let insert_query = `insert into ${ this.collection } (username, password) values('${ username }', '${ encriptar(password) }')`;

        const res = await this.consulta( insert_query);

        console.log( res );
    }

}