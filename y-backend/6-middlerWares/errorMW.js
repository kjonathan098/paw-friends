module.exports = function errorMiddleware(err, req, res, next) {
	console.log(err)
	res.status(err.status).send({
		error: true,
		message: err.message,
	})
}
