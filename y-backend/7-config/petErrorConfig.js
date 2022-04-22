const petErrorHandler = {
	joiValidationFailed: (message) => {
		return {status: 400, message: message}
	},
	notFound: () => {
		return {status: 400, message: 'Pet not found in our shelter'}
	},
	alreadyAdopted: () => {
		return {status: 200, message: 'Pet already in a cozy home'}
	},
	alreadyFostered: () => {
		return {status: 200, message: 'Pet already fostered in a cozy home'}
	},
	onlyAdmin: () => {
		return {status: 400, message: 'Only Admins allowed'}
	},
}

module.exports = {petErrorHandler}
