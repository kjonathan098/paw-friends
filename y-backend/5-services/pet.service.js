const {Pet} = require('../1-models/petsModels')
const _ = require('lodash')
const {AdoptPet} = require('../1-models/userAdoptedPetsModel')
const {FavoritePet} = require('../1-models/userSavePet')

// Create an obj of pet for DB
const formPetObj = (body) => {
	let petObj = _.pick(body, ['type', 'name', 'adoptionStatus', 'picture', 'height', 'weight', 'color', 'bio', 'hypoallergenic', 'dietaryRestrictions', 'breed'])
	return petObj
}

const addPet = async (body) => {
	let pet = formPetObj(body)

	pet = new Pet(pet)
	pet = await pet.save()
	return pet
}

const getAll = async () => {
	const pets = await Pet.find()
	return pets
}
const getOne = async (id) => {
	const pet = await Pet.findById(id)
	return pet
}

const changePetStatus = async (petId, userRequest) => {
	await Pet.findByIdAndUpdate({_id: petId}, {adoptionStatus: userRequest ? userRequest : 'Available'})
	return true
}

const adoptFirstPet = async (petId, uid) => {
	const pet = new AdoptPet({uid: uid, adoptedPet: petId})
	await pet.save()
	return true
}

const editPet = async (body, petId) => {
	// Call function to create the obj for us
	const petObj = formPetObj(body)

	// Find a pet and edit
	const pet = await Pet.findByIdAndUpdate({_id: petId}, petObj)
	if (!pet) return false

	return pet
}

const returnPet = async (petId, uid) => {
	const pet = await AdoptPet.findOneAndUpdate({uid: uid}, {$pull: {adoptedPet: petId}})

	if (!pet) return false

	return 'Pet returned to shelter'
}

const changeOwner = async (petId) => {
	const pet = await AdoptPet.findOneAndUpdate({pets: petId}, {$pull: {adoptedPet: petId}})

	if (!pet) return false
	return 'Pet returned to shelter'
}

const checkStatus = (status, userRequest) => {
	if (status === 'adopt') return 'adopted'

	if (status === 'foster' && userRequest === 'foster') return 'fostered'

	if (status === 'foster' && userRequest === 'adopt') return 'changeOwner'
}

const findUserPetsAndUpd = async (petId, uid) => {
	const findDoc = await AdoptPet.findOneAndUpdate({uid: uid}, {$push: {adoptedPet: petId}})

	if (!findDoc) return null
	return true
}

// CHANGE NAME REMEMBER
const genericFunction = async (Class, uid, petId) => {
	const updDoc = await Class.findOneAndUpdate({uid: uid}, {$push: {favoritePet: petId}}, {new: true})
	if (!updDoc) return null
	return updDoc
}

// CHANGE NAME REMEMBER
const saveFirstPetGeneric = async (Class, uid, petId) => {
	const pet = new Class({uid: uid, favoritePet: petId})
	await pet.save()
	return pet
}

// DELETE PET FROM FAVORITES
const removePetFromList = async (uid, petId) => {
	const updDoc = await FavoritePet.findOneAndUpdate({uid: uid}, {$pull: {favoritePet: petId}}, {new: true})
	return updDoc
}

// FIND USER'S ADOPTED AND FAVORITED PETS
const findUserStoredPets = async (userId) => {
	// find adopted pets and populate
	let adoptedPets = await AdoptPet.findOne({uid: userId}).populate('adoptedPet').populate('uid', 'name , -_id')

	// find favorite pets and populate
	const favoritePets = await FavoritePet.findOne({uid: userId}).populate('favoritePet')

	// Join the favorite pets to obj
	const newObj = {
		userName: adoptedPets.uid.name,
		adoptedPets: adoptedPets.adoptedPet,
		// favoritePets: favoritePets.favoritePet,
	}

	return newObj
}

const getFullUser = async (uid) => {
	const user = await AdoptPet.findOne({uid: uid}).populate('adoptedPet', '-_id').populate('uid', '-password')

	return user
}

module.exports = {addPet, getAll, getOne, findUserPetsAndUpd, changePetStatus, adoptFirstPet, editPet, returnPet, changeOwner, checkStatus, genericFunction, saveFirstPetGeneric, removePetFromList, findUserStoredPets, getFullUser}
