const express = require('express');/* nombre del paquete */
const app = express();
const http = require('http');
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors');
const res = require('express/lib/response');
const passport = require('passport');

/* Rutas */
const users = require('./routes/usersRoutes')

const port = process.env.PORT || 3000

app.use(logger('dev'));/* debugear los errores */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by')
app.set('port', port)

/* llamar rutas */
users(app);


server.listen(3000, '172.21.0.1' || 'localhost', function () {
    console.log('Aplicacion de NodeJs ' + process.pid + ' Iniciada')
});


/* manejo de error */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}