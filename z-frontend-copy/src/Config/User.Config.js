import axios from 'axios'
const userInfo = JSON.parse(localStorage.getItem('user_info'))

const userConfig = {
	loginUser: async (values) => {
		try {
			const res = await axios.post('http://localhost:4000/api/auth/login', values)

			//extract info and set them in local
			const access_token = res.data.acces_token
			const refresh_token = res.data.refresh_token
			const userInfo = {name: res.data.name, surName: res.data.surName, uid: res.data.uid, permissions: res.data.permissions}

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
	registerUser: async (values) => {
		try {
			const res = await axios.post('http://localhost:4000/api/auth/register', values)
			return res.data
		} catch (error) {
			return error?.response?.data || {error: true, message: 'Error'}
		}
	},
	updUserProfile: async (query) => {
		try {
			const res = await axios.put(`http://localhost:4000/api/user/${userInfo.uid}`, query, {headers: {Authorization: localStorage.getItem('access_token')}})
			return true
		} catch (error) {
			return error?.response?.data || {error: true, message: 'Error'}
		}
	},
	updUserPassword: async (query) => {
		try {
			const res = await axios.put(`http://localhost:4000/api/user/password/626663f091235bcf5b0f66f0`, query, {headers: {Authorization: localStorage.getItem('access_token')}})
			return true
		} catch (error) {
			return {error: true, message: 'Error'}
		}
	},
}

export default userConfig
