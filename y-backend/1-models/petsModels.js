const mongoose = require('mongoose')

const petSchema = mongoose.Schema({
	type: {
		type: Number,
		required: true,
		max: 2,
	},
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	adoptionStatus: {
		type: Number,
		required: true,
		default: 0,
		max: 3,
	},
	picture: {
		type: String,
		required: false,
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
