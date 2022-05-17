import axios from 'axios'
const userConfig = {
	loginUser: async (values) => {
		try {
			const res = await axios.post('http://localhost:4000/api/auth/login', values)

			//extract info and set them in local
			const access_token = res.data.acces_token
			const refresh_token = res.data.refresh_token
			const userInfo = {name: res.data.name, surName: res.data.surName, uid: res.data.uid}

			localStorage.setItem('access_token', access_token)
			localStorage.setItem('refresh_token', refresh_token)
			localStorage.setItem('user_info', JSON.stringify(userInfo))
			return userInfo
		} catch (error) {
			return error.response.data
		}
	},

	logoutUser: () => {
		localStorage.clear()
	},
}

export default userConfig
