/* rutas */
const CategoryController = require('../controllers/categoriesController');
                            /* trabajar con peticiones jwt */
const passport = require('passport');


/* app = peticiones rest, upload= subir iamgenes */
module.exports = (app, upload) => {
    /* listar */
    app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoryController.getAll);

    /* crear */
    app.post('/api/categories/create',passport.authenticate('jwt', {session: false}), upload.array('image', 1), CategoryController.create);

    /* 401 unuthorized */
    /* actualizar datos */         /* enviar el token de session de usuario */
    
}