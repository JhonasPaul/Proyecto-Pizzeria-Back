const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios : ${data}`);
            return res.status(200).json(data);
        }catch(error){
            console.error(`error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async register(req, res, next) {
        try {
            const user = req.body;/* captura lo que el cliente envia a traves de parametros */
            const data = await User.create(user);
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: {
                    'id': data.id
                }
            });
        }catch(error){
            console.log(`Error_ ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro de usuario',
                error: error
            })
        }
    },

    async login(req, res, next) {
        try {
            /* se mandara por el cliente */
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El mail no fue encontrado'
                })
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);
            if(isPasswordValid){
               const token = jwt.sign({id: myUser.id,email: myUser.email}, keys.secretOrKey, {
                    // expiresIn
               })

               const data = {
                   id: myUser.id,
                   name:myUser.name,
                   lastname: myUser.lastname,
                   email: myUser.email,
                   phone: myUser.phone,
                   image: myUser.image,
                   session: `JWT ${token}`
               };
               return res.status(201).json({
                   success: true,
                   message: 'El usuario ha sido autenticado',
                   data: data
               });
            }else{
                /* UNAUTHORIZED */
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }

        }catch(erro){
            console.log(`Error_ ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el login de usuario',
                error: error
            })
        }
    }
};