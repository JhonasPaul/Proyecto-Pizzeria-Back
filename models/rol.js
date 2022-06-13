/* mapeo de roles */
const db = require('../config/config')/* para trabajar con la base de datos */

const Rol = {};

Rol.create = (id_user, id_rol) => {
    const sql = `insert into user_has_roles(id_user, id_rol, created_at, updated_at) values($1, $2, $3, $4)`;
    return db.none(sql, [ /* no retorna nada porque solo se inserta datos a la tabla */
        id_user, 
        id_rol,
        new Date(),
        new Date()
    ]);
}

module.exports = Rol;