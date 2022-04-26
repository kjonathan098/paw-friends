const bcrypt = require('bcrypt')
const BCYPT_SALT_ROUND = parseInt(process.env.BCYPT_SALT_ROUND)

const hash = async (password) => {
	return bcrypt.hashSync(password, BCYPT_SALT_ROUND)
}

const compare = async (valueOne, valueTwo) => {
	const passwordValidation = await bcrypt.compare(valueOne, valueTwo)
	if (!passwordValidation) return passwordValidation
	return true
}

module.exports = {
	hash,
	compare,
}
