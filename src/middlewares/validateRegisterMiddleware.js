const path = require('path');
const { body } = require('express-validator');

console.log();

module.exports = [
	
	body('name').notEmpty().withMessage('Tienes que escribir un nombre').bail()
	.isLength({ min: 2, max: 100 }).withMessage("debe tener al menos 2 caracteres"),

	body('username').notEmpty().withMessage('Tienes que escribir un nombre de usuario')
	.isLength({ min: 8, max: 22 }).withMessage("debe tener al menos 8 caracteres"),

	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),

	body('password')
	.notEmpty().withMessage('Tienes que escribir una contraseña').bail()
	.isLength({ min: 8, max: 60 }).withMessage("debe tener al menos 8 caracteres"),

	body('pass_confirm')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .isLength({ min: 8 })
        .custom((value, { req }) => {
            if(value != req.body.password){
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
		
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]