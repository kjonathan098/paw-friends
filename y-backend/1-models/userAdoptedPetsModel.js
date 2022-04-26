const mongoose = require('mongoose')

const userAdoptPetsSchema = mongoose.Schema({
	uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	adoptedPet: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true}],
})
const AdoptPet = mongoose.model('user.Adopted.Pet', userAdoptPetsSchema)
exports.AdoptPet = AdoptPet
