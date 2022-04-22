const errorHandler = {
	joiValidationFailed: (message) => {
		return {status: 400, message: message}
	},
	userExist: () => {
		return {status: 400, message: 'Email already registered'}
	},
	passwordMismatch: () => {
		return {status: 400, message: 'Passwords dont match'}
	},
	needToLogin: () => {
		return {status: 400, message: 'Please Login.. Token mwf'}
	},
}

module.exports = {errorHandler}
