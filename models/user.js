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

    return db.oneOrNone(sql, id).then(user =>{callback(null, user)})
}

User.findByEmail = (email) => {
    const sql = `select id, email, name, lastname, image, phone, password, session_token from users
    where email = $1`;
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

module.exports = User;