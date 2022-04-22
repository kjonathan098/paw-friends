const {errorHandler} = require('../7-config/errorConfig')
const {jwtHanddler} = require('../8-lib/jwt.lib')
const sceretJwt = 'Secret_key'

// REMEMBER TO CHANGE SECRET TO .ENV FILE and DO IT IN LIB INSTEAD

const validateToken = async (req, res, next) => {
	if (['/api/users/login', '/api/auth/register'].includes(req.url)) return next()

	const token = req.header('Authorization')
	if (!token) return next(errorHandler.needToLogin())

	// verify token
	try {
		const decoded = jwtHanddler.verify(token)

		if (decoded.refresh) return next(errorHandler.needToLogin())
		req.user = {uid: decoded.payloadData._id}

		next()
	} catch (ex) {
		return res.send(ex.message)
	}
}

exports.validateToken = validateToken
