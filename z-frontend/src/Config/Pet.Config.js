const handlePetRequest = {
	returnPet: async () => {
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/${pet._id}/return`, {request: 'return'}, {headers: {Authorization: localStorage.getItem('access_token')}})
			return true
		} catch (error) {
            
        }
	},
}
