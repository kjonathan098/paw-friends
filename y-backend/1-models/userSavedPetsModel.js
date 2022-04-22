const mongoose = require('mongoose')

const userSavedPetsSchema = mongoose.Schema({
	uid: {
		type: String,
		minlength: 3,
	},
	pets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true}],
})
const UserSavedPet = mongoose.model('userSavedPet', userSavedPetsSchema)
exports.UserSavedPet = UserSavedPet
