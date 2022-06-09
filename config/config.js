const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) =>{}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

/* establecer los valores para conectarse a la db */
const databaseConfig = {
    'host': '127.0.0.1',
    'port': '5432',
    'database': 'delivery_db',
    'user': 'postgres',
    'password': '45549813O'
};

const db = pgp(databaseConfig);

module.exports = db;