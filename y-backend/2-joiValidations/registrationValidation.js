const Joi = require('Joi')
const registerValidation = (object) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		surName: Joi.string().min(3).required(),
		email: Joi.string().min(3).required().email(),
		password: Joi.string().min(3).required(),
		rePassword: Joi.string().min(3).required(),
		phone: Joi.number().min(5).required(),
		permissions: Joi.object(),
	})

	const validation = schema.validate(object)
	return validation
}
exports.registerValidation = registerValidation
