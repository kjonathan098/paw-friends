import axios from 'axios'
import React, {useContext} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import useFetch from '../../../CustomHooks/apiCalls/useFetch'
import authContext from '../AuthContext'
import petsContext from './PetsContex'

const PetsProvider = ({children}) => {
	const {isLoggedIn, userInfo} = useContext(authContext)
	const [userAdoptedPet, setUserAdoptedPet] = useState([])
	const [userFavorites, setUserFavorites] = useState([])
	const [loadingUserPets, setLoadingUserPets] = useState()
	const [allPets, setAllPets] = useState([])
	const [e, setError] = useState()

	// fetch all pets
	const {data: pets, fetchLoading, error, reFetch} = useFetch('http://localhost:4000/api/pet/')

	// Fetch users Pets
	const fetchUserPets = async () => {
		try {
			const userPets = await axios.get(`http://localhost:4000/api/pet/userPets/${userInfo.uid}`)
			setUserAdoptedPet(userPets.data.adoptedPet)
			setUserFavorites([...userPets.data.favoritePet])
		} catch (error) {
			setError(error)
		} finally {
			setLoadingUserPets(false)
		}
	}

		// Change Pets display according to query
		const fetchDogs =  () => {

		}


	useEffect(() => {
		console.log(pets, 'petssss')
		setLoadingUserPets(true)
		if (!pets) return setLoadingUserPets(false)
		setAllPets([...pets.data])
		if (!isLoggedIn) return setLoadingUserPets(false)
		fetchUserPets()
	}, [isLoggedIn, pets])

	return <petsContext.Provider value={{userAdoptedPet, setUserAdoptedPet, userFavorites, setUserFavorites, loadingUserPets, allPets, setAllPets}}>{children}</petsContext.Provider>
}

export default PetsProvider
