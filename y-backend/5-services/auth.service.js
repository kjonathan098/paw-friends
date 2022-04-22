const {Tokens} = require('../1-models/tokensModel')
const _ = require('lodash')
const {UserPermission} = require('../1-models/userPermissionsModel')

const saveTokensDB = async (access_token, refresh_token, uid) => {
	let tokens = new Tokens({
		access_token,
		refresh_token,
		uid,
	})

	tokens = await tokens.save()
}

const saveUserInReddis = async (user) => {
	let userReddis = {permissions: user.permissions, uid: user._id}

	userReddis

	userReddis = new UserPermission(userReddis)

	await userReddis.save()
	console.log('success')
	return 'success'
}
module.exports = {saveTokensDB, saveUserInReddis}
