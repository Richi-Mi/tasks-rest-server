import bcryptjs from 'bcryptjs';

export const encriptar = ( texto ) => {
    const salt = bcryptjs.genSaltSync(10);

    return bcryptjs.hashSync( texto, salt );
}
export const comparar = ( text, encripted_text ) => {
    
}