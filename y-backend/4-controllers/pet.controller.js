const {petErrorHandler} = require('../7-config/petErrorConfig')
const {validatePet, validateEditedPet} = require('../2-joiValidations/petValidation')
const {joiValidateService} = require('../5-services/joi.validate.serivces')
const petServices = require('../5-services/pet.service')
const _ = require('lodash')
const {UserSavedPet, AdoptPet} = require('../1-models/userAdoptedPetsModel')
const {SavePet} = require('../1-models/userSavePet')
const {Pet} = require('../1-models/petsModels')
const {FavoritePet} = require('../1-models/userSavePet')

const addPet = async (req, res, next) => {
	// Validate user is an admin
	if (!req.user.permissions.admin) next(petErrorHandler.onlyAdmin())

	// Validate req
	const error = joiValidateService(validatePet, req.body)
	if (error) return next(petErrorHandler.joiValidationFailed(error))

	// save Pet on DB
	const pet = await petServices.addPet(req.body)
	return res.send(pet)
}

const findAll = async (req, res) => {
	// Get all pets from DB
	console.log(req.query)
	const pets = await petServices.getAll()
	return res.send(pets)
}

const findOne = async (req, res, next) => {
	// Get specific Pet
	const pet = await petServices.getOne(req.params.id)
	if (!pet) return next(petErrorHandler.notFound())
	return res.send(pet)
}

const adoptFoster = async (req, res, next) => {
	// NEED TO DO validate request

	const userRequest = req.body.request
	const petId = req.params.id
	const uid = req.user.uid

	// Find if pet exist
	let pet = await petServices.getOne(petId)
	if (!pet) return next(petErrorHandler.notFound())

	// if pet exist check for status
	const statusCheck = petServices.checkStatus(pet.adoptionStatus, userRequest)
	if (statusCheck === 'adopted') return next(petErrorHandler.alreadyAdopted())
	if (statusCheck === 'fostered') return next(petErrorHandler.alreadyFostered())
	if (statusCheck === 'changeOwner') await petServices.changeOwner(petId, petId)

	// Find if user already has a Doc & Update
	const findDoc = await petServices.findUserPetsAndUpd(petId, uid)
	if (findDoc) {
		// change pet status
		await petServices.changePetStatus(petId, userRequest)
		return res.send(`Pet added to your ${userRequest} list`)
	}

	// If not create one for him
	pet = await petServices.adoptFirstPet(petId, uid)

	// Update status of pet
	await petServices.changePetStatus(petId, userRequest)

	return res.send(`Pet added to your ${userRequest} list`)
}

const editPet = async (req, res, next) => {
	// validate that req has fields filled
	const error = joiValidateService(validateEditedPet, req.body)
	if (error) return next(petErrorHandler.joiValidationFailed(error))

	// Send new values to DB
	const editPet = await petServices.editPet(req.body, req.params.id)
	if (!editPet) next(petErrorHandler.notFound())

	return res.send(editPet)
}

const returnPet = async (req, res, next) => {
	const uid = req.user.uid
	const petId = req.params.id

	// Remove pet reference from user's list
	const response = await petServices.returnPet(petId, uid)
	if (!response) next(petErrorHandler.petNotInList())

	// Change pet status on DB
	await petServices.changePetStatus(petId)

	return res.send(response)
}

const savePet = async (req, res, next) => {
	petId = req.params.id
	uid = req.user.uid

	const updDoc = await petServices.genericFunction(FavoritePet, uid, petId)

	if (!updDoc) {
		const createDoc = await petServices.saveFirstPetGeneric(FavoritePet, uid, petId)
		return res.send(createDoc)
	}

	return res.send(updDoc)
}

const deletePet = async (req, res, next) => {
	petId = req.params.id
	uid = req.user.uid

	// Remove pet reference from user's list
	const updDoc = await petServices.removePetFromList(uid, petId)

	return res.send(updDoc)
}

const findUserPets = async (req, res, next) => {
	userId = req.params.id

	console.log('hello')

	// Get list of adopte pets and favorited pets
	const adoptedPets = await petServices.findUserStoredPets(userId)

	return res.send(adoptedPets)
}

module.exports = {addPet, findAll, findOne, adoptFoster, editPet, returnPet, savePet, deletePet, findUserPets}
