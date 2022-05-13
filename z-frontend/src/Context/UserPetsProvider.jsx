import {userPetsContext} from './UserPetsContext'
import axios from 'axios'

import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'

const UserPetsProvider = ({children}) => {
	const [userAdoptedPets, setUserAdoptedPets] = useState()
	const [userFavoritePets, setUserFavoritePets] = useState()

	const name = 'maria'

	const getUserPets = async (uid) => {
		try {
			const res = await axios.get(`http://localhost:4000/api/pet/userPets/${uid}`)
			setUserAdoptedPets(res.data.adoptedPet)
			setUserFavoritePets(res.data.favoritePet)
		} catch (error) {
			console.log(error, 'error')
		}
	}

	// If user is already logged in lets get his pets
	useEffect(() => {
		console.log('hello fomr here')
		let userInfo = localStorage.getItem('user_info')
		if (!userInfo) return

		userInfo = JSON.parse(userInfo)
		const uid = userInfo.uid
		console.log(uid)
		getUserPets(uid)
	}, [])

	return <userPetsContext.Provider value={{userAdoptedPets, userFavoritePets, getUserPets, name}}>{children}</userPetsContext.Provider>
}

export default UserPetsProvider
