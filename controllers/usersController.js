const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const storage = require('../utils/cloud_storage')


module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios : ${data}`);
            return res.status(201).json(data);
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

            /* asignar el rol por defecto */
            await Rol.create(data.id, 1);
            /*crtear el token*/
            const token = jwt.sign({id: data.id, email: user.email}, keys.secretOrKey, {
                // expiresIn
           })

           /* datos a mostrar en el json(postman) que se almacenara en la sesion del usuario*/
           const myData = {
               id: data.id,
               name:user.name,
               lastname: user.lastname,
               email: user.email,
               phone: user.phone,
               image: user.image,
               session_token: `JWT ${token}`
           };


            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: myData
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

               /* datos a mostrar en el json(postman) */
               const data = {
                   id: myUser.id,
                   name:myUser.name,
                   lastname: myUser.lastname,
                   email: myUser.email,
                   phone: myUser.phone,
                   image: myUser.image,
                   session_token: `JWT ${token}`,
                   roles: myUser.roles
               }
               console.log(`USUARIO ENVIADO ${data}`)
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

        }catch(error){
            console.log(`Error_ ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el login de usuario',
                error: error
            })
        }
    },

    async update(req, res, next){
        try{
            console.log('Usuario', req.body.user)

            const user = JSON.parse(req.body.user); /* el cliente debe enviar un objeto user con datos del usuario */
            console.log('Usuario Parseado', user);

            const files = req.files;

            if(files.length > 0){/* si el cliente nos envia el archivo */
                const pathImage = `image_${Date.now()}` /* nomre del archivo */
                const url = await storage(files[0], pathImage)

                if(url != undefined && url != null){
                    user.image = url
                }
            }

            await User.update(user);/* guardando la url en la base de datos */
            return res.status(201).json({
                success: true, 
                message: 'Los datos del usuarion se han actualizado corretamente',
                data: user
            });


        }catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar los datos del usuario',
                error: error
            })
        }
    }

};




