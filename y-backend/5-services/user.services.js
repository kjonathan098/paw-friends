const {User} = require('../1-models/userModel')

const findUserById = async (uid) => {
	const user = await User.findById({_id: uid})
	return user
}

module.exports = {findUserById}
