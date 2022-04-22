const _ = require('lodash')
const bcrypt = require('bcrypt')
const {User} = require('../1-models/userModel')
const {registerValidation} = require('../2-joiValidations/registrationValidation')
const {loginValidation} = require('../2-joiValidations/loginValidation')
const {jwtHanddler} = require('../8-lib/jwt.lib')
const {errorHandler} = require('../7-config/errorConfig')
const authService = require('../5-services/auth.service')

const express = require('express')
const router = express.Router()

// REGISTER
router.post('/register', async (req, res, next) => {
	// Validate body with Joi
	const {error} = registerValidation(req.body)
	if (error) return next(errorHandler.joiValidationFailed(error.details[0].message))

	// Check if User already exists
	let user = await User.findOne({email: req.body.email})
	if (user) return next(errorHandler.userExist())

	// validate password matches
	if (req.body.password !== req.body.rePassword) return next(errorHandler.passwordMismatch())

	//Hash password
	const salt = await bcrypt.genSalt(10)
	const hashed = await bcrypt.hash(req.body.password, salt)

	// change password to hashed
	req.body.password = hashed

	// create new user object
	user = new User(_.pick(req.body, ['name', 'surName', 'email', 'password', 'phone', 'permissions']))

	console.log(user)

	// save user to DB
	user = await user.save()

	// send back this user obj
	user = _.pick(user, ['name', 'email', 'surName', '_id', 'permissions'])
	// console.log(user)
	return res.send({succes: true, user: user})
})

//LOGIN
router.post('/login', async (req, res) => {
	// Validate Body with Joi
	const {error} = loginValidation(req.body)
	if (error) return next(errorHandler.joiValidationFailed(error.details[0].message))

	// Check if users exist in DB and get user
	const user = await User.findOne({email: req.body.email})
	if (!user) return res.status(401).send('invalid email or password')

	// Check password with bcrypt
	const passwordValidation = await bcrypt.compare(req.body.password, user.password)
	if (!passwordValidation) return res.send('Invalid email or password')

	// Save user permissions in "reddis"
	const userPerm = await authService.saveUserInReddis(user)

	console.log(userPerm)

	// Create Tokens
	const tokens = jwtHanddler.createTokens(user)

	return res.send(tokens)
})

module.exports = router
