const ProductsController = require('../controllers/productsController')
const passport = require('passport')/* protege las url */

module.exports = (app, upload) => {
    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);
}