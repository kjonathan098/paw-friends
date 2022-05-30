import axios from 'axios'

const handlePetRequest = {
	returnPet: async (pet) => {
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/${pet._id}/return`, {request: 'return'}, {headers: {Authorization: localStorage.getItem('access_token')}})
			return true
		} catch (error) {
			return {error: true, message: error.response.data}
		}
	},
	adoptPet: async (pet) => {
		console.log(pet._id)
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/${pet._id}/adopt`, {request: 2}, {headers: {Authorization: localStorage.getItem('access_token')}})
			return res.data
		} catch (error) {
			return error.response.data
		}
	},

	fosterPet: async (pet) => {
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/${pet._id}/adopt`, {request: 1}, {headers: {Authorization: localStorage.getItem('access_token')}})
			return res.data
		} catch (error) {
			return error.response.data
		}
	},

	addToFavorites: async (pet) => {
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/${pet._id}/save`, {body: 'doesnt matter'}, {headers: {Authorization: localStorage.getItem('access_token')}})
			return res.data.message
		} catch (error) {
			return error.response.data
		}
	},

	removeFromFavorites: async (pet) => {
		try {
			const res = await axios.delete(`http://localhost:4000/api/pet/${pet._id}/save`, {headers: {Authorization: localStorage.getItem('access_token')}})
			return res.data.message
		} catch (error) {
			return {error: true, message: error.response.data}
		}
	},
	addNewPet: async (values) => {
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/`, values, {headers: {Authorization: localStorage.getItem('access_token')}})
			return res.data
		} catch (error) {
			return {error: true, message: error.response.data}
		}
	},
	updPet: async (pet, values) => {
		try {
			const res = await axios.put(`http://localhost:4000/api/pet/${pet._id}`, values, {headers: {Authorization: localStorage.getItem('access_token')}})
			return res.data
		} catch (error) {
			return {error: true, message: error.response.data}
		}
	},
}

export default handlePetRequest
