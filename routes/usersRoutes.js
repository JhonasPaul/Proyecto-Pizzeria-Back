/* rutas */
const UsersController = require('../controllers/usersController');
                            /* trabajar con peticiones jwt */
const passport = require('passport');


module.exports = (app, upload) => {
    /* listar */
    app.get('/api/users/getAll', UsersController.getAll);

    /* crear */
    app.post('/api/users/create', UsersController.register);

    app.post('/api/users/login', UsersController.login);

    /* 401 unuthorized */
    /* actualizar datos */         /* enviar el token de session de usuario */
    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.update);

    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session: false}), UsersController.updatewithoutImage);
}