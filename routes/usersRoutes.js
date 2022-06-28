/* rutas */
const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    /* listar */
    app.get('/api/users/getAll', UsersController.getAll);

    /* crear */
    app.post('/api/users/create', UsersController.register);

    app.post('/api/users/login', UsersController.login);

    /* actualizar datos */
    app.put('/api/users/update', upload.array('image', 1), UsersController.update);


}