const _ = require('lodash')
const {Pet} = require('../1-models/petsModels')
const {UserSavedPet} = require('../1-models/userSavedPetsModel')
const {validatePet} = require('../2-joiValidations/petValidation')
const {petErrorHandler} = require('../7-config/petErrorConfig')
const {validateToken} = require('../6-middlerWares/validateToken')
const express = require('express')
const setPermissions = require('../6-middlerWares/setPermissions')
const router = express.Router()

//POST
router.post('/', validateToken, setPermissions, async (req, res, next) => {
	// Validate user is an admin
	if (!req.user.permissions.admin) next(petErrorHandler.onlyAdmin())

	// Validate req
	const {error} = validatePet(req.body)
	if (error) return next(petErrorHandler.joiValidationFailed(error.details[0].message))

	// Create new pet Obj
	let pet = _.pick(req.body, ['type', 'name', 'adoptionStatus', 'picture', 'height', 'weight', 'color', 'bio', 'hypoallergenic', 'dietaryRestrictions', 'breed'])

	// create instace of Pet
	pet = new Pet(pet)

	// save Pet on DB
	pet = await pet.save()
	return res.send(pet)
})

// GET ALL
router.get('/', async (req, res) => {
	// Get all pets from DB
	const pets = await Pet.find()
	res.send(pets)
})

// GET ONE
router.get('/:id', async (req, res) => {
	// Get specific Pet
	const pet = await Pet.findById(req.params.id)
	res.send(pet)
})

// GET ONE AND ADOPT (CHANGE STATUS)

router.post('/:id/adopt', validateToken, async (req, res, next) => {
	// NEED TO DO validate request

	// Find if pet exist
	const userRequest = req.body.request
	const petId = req.params.id
	let pet = await Pet.findById({_id: petId})
	if (!pet) return next(petErrorHandler.notFound())

	// if pet exist check for status

	if (pet.adoptionStatus === 'adopt') return next(petErrorHandler.alreadyAdopted())
	if (pet.adoptionStatus === 'foster' && userRequest === 'foster') return next(petErrorHandler.alreadyFostered())

	// Find if user already has a Doc & Update

	const findDoc = await UserSavedPet.findOneAndUpdate({uid: req.user.uid}, {$push: {pets: petId}})
	if (findDoc) {
		// change pet status
		await Pet.findByIdAndUpdate({_id: petId}, {adoptionStatus: userRequest})
		return res.send('Pet added to your list')
	}

	// // If not create one for him
	pet = new UserSavedPet({uid: req.body.uid, pets: pet._id})

	// // save doc in DB

	await pet.save()

	// Update status of pet adoptionStatus

	await Pet.findByIdAndUpdate({_id: petId}, {adoptionStatus: petStatus})

	return res.send('Pet added to your list')
})

module.exports = router
