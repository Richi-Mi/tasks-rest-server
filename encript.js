import bcryptjs from 'bcryptjs';

export const encriptar = ( texto ) => {
    const salt = bcryptjs.genSaltSync(10);

    return bcryptjs.hashSync( texto, salt );
}
export const comparar = ( text, encripted_text ) => {
    const compare = bcryptjs.compare( text, encripted_text );

    return compare;
}