const Category = require('../models/category')
const storage = require('../utils/cloud_storage')

module.exports = {
    async create(req, res, next){
        console.log('REQ BODY', req.body)
        try {
            const category = JSON.parse(req.body.category)

            console.log('Category', category);

            const files = req.files;

            if(files.length > 0){/* si el cliente nos envia el archivo */
                const pathImage = `image_${Date.now()}` /* guarda el nombre del archivo */
                const url = await storage(files[0], pathImage)/* obtiene la url */

                if(url != undefined && url != null){
                    category.image = url
                }
            }

            const data = await Category.create(category);

            return res.status(201).json({
                success: true,
                message: 'La categoria se ha creado correctamente',
                data: {
                    'id': data.id
                }
            })

        }catch(error){
            console.log('Error', error)
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear la categoria',
                error: error
            })
        }
    }
}