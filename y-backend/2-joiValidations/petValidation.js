const Joi = require('Joi')

const validatePet = (object) => {
	const schema = Joi.object({
		type: Joi.string().min(1).required(),
		name: Joi.string().min(3).required(),
		adoptionStatus: Joi.string().min(3).required(),
		picture: Joi.string().min(3).required(),
		height: Joi.number().required(),
		weight: Joi.number().required(),
		color: Joi.string().min(3).required(),
		bio: Joi.string().min(3).required(),
		hypoallergenic: Joi.boolean(),
		dietaryRestrictions: Joi.string().min(1).required(),
		breed: Joi.string().min(3).required(),
	})

	const validation = schema.validate(object)
	return validation
}

const validateEditedPet = (object) => {
	const schema = Joi.object({
		type: Joi.string().min(1),
		name: Joi.string().min(3),
		adoptionStatus: Joi.string(),
		picture: Joi.string().min(3),
		height: Joi.number(),
		weight: Joi.number(),
		color: Joi.string(),
		bio: Joi.string(),
		hypoallergenic: Joi.boolean(),
		dietaryRestrictions: Joi.string().min(1),
		breed: Joi.string().min(3),
	})

	const validation = schema.validate(object)
	return validation
}

exports.validatePet = validatePet
exports.validateEditedPet = validateEditedPet
