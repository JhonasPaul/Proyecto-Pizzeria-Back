/* rutas */
const UsersController = require('../controllers/usersController');

module.exports = (app) => {
    /* listar */
    app.get('/api/users/getAll', UsersController.getAll);

    /* crear */
    app.post('/api/users/create', UsersController.register);

    app.post('/api/users/login', UsersController.login);


}