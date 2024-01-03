import mysql from 'mysql';
import { comparar, encriptar } from '../encript.js';

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
        try {
            let insert_query = `insert into ${ this.collection } (username, password) values('${ username }', '${ encriptar(password) }')`;

            const { affectedRows } = await this.consulta( insert_query);

            if( affectedRows > 0 )
                return true;
            else 
                return false;
            
        } catch (err) {
            return false;
        }
    }

    async login( username, password ) {
        try {
            const log_query = `select password from ${ this.collection } where username = '${username}'`;
            const [ { password: password_encripted } ] = await this.consulta( log_query );

            const isLog = comparar( password, password_encripted );
        
            return isLog;
        } catch (err) {
            return false;
        }
     
    }
    async get_info( username ) {
        try {
            const select_query = `select * from ${this.collection} where username = '${username}'`;
        
            const res = await this.consulta( select_query );
            return res;
        } catch (err) {
            return null;
        }
    }
}
export class TaskDB extends DataBase {
    constructor() {
        super()
    }
}