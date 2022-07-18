const db = require('../config/config')

const Category ={};

Category.getAll = () => {
    const sql = `select id, name, image from categories order by name`;
    return db.manyOrNone(sql);
}

Category.create = (category) =>{
    const sql = `insert into categories(name, image, created_at, updated_at)values($1, $2, $3, $4)
    returning id`;
    return db.oneOrNone(sql, [
        category.name, 
        category.image,
        new Date(),
        new Date()

    ])
}

module.exports = Category;