const mongoose = require('mongoose')

const petSchema = mongoose.Schema({
	type: {
		type: String,
		required: true,
		minlength: 3,
	},
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	adoptionStatus: {
		type: String,
		required: true,
		minlength: 1,
	},
	picture: {
		type: String,
		required: true,
		minlength: 1,
	},
	height: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: true,
		minlength: 1,
	},
	bio: {
		type: String,
		required: true,
		minlength: 1,
	},
	hypoallergenic: {
		type: Boolean,
		required: true,
		minlength: 1,
	},
	dietaryRestrictions: {
		type: String,
		required: true,
		minlength: 1,
	},
	breed: {
		type: String,
		required: true,
		minlength: 1,
	},
})

const Pet = mongoose.model('Pets', petSchema)

exports.Pet = Pet
