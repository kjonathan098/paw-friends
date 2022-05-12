const mongoose = require('mongoose')

const userSavePetsSchema = mongoose.Schema({
	uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	adoptedPet: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true}],
	favoritePet: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pets'}],
})
const SavePet = mongoose.model('user.Pets', userSavePetsSchema)
exports.SavePet = SavePet
