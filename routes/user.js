const db = require('../config/config')
const bcrypt = require('bcryptjs')
const User = {};

User.getAll = () => {
    const sql = `select * from users`;

    return db.manyOrNone(sql);
}

User.findById = (id, callback) => {
    const sql = `select id, email, name, lastname, image, phone, password, session_token from users
    where id = $1`;

    return db.oneOrNone(sql, id).then(user => { callback(null, user) })
}

User.findByEmail = (email) => {
    const sql = `select U.id, U.email, U.name, U.lastname, U.image, U.phone, U.password, U.session_token, json_agg(
        json_build_object(
            'id', R.id,
            'name', R.name,
            'image', R.image,
            'route', R.route
        )
    ) as roles
    from users as U
    inner join user_has_roles as UHR on UHR.id_user = U.id  
    inner join roles as R  on R.id = UHR.id_rol where U.email = $1
    group by U.id;`;
    return db.oneOrNone(sql, email);
}

User.create = async (user) => {
    /* encriptar contraseña */
    const hash = await bcrypt.hash(user.password, 10);
    const sql = `insert into users (email,name,lastname,phone,image,password,created_at,updated_at)
    values($1, $2, $3, $4, $5, $6, $7, $8) returning id`;
    return db.oneOrNone(sql, [/* retorna un id o nada */
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        hash,
        new Date(),
        new Date()
    ]);
}

User.update = (user) => {
    const sql = `update users set name = $2, lastname = $3, phone = $4, image = $5, updated_at = $6 where id = $1`;
    return bd.none(sql, [
        user.id, 
        user.name, 
        user.lastname, 
        user.phone, 
        user.image, 
        new Date()
    ])
}

module.exports = User;