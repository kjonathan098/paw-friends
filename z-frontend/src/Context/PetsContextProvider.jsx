import axios from 'axios'
import {petsContext} from './PetsContext'
import usePetHook from '../CustomHooks/usePetHook'

import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import useFetch from '../CustomHooks/apiCalls/useFetch'

const PetsContextProvider = ({children}) => {
	const [allPetsList, setAllPetsList] = useState()
	const [loadingPets, setLoadingPets] = useState()
	const [error, setError] = useState()

	const test = 'test'

	useEffect(() => {
		const fetch = async () => {
			setLoadingPets(true)
			try {
				const data = await axios.get(`http://localhost:4000/api/pet/`, {headers: {Authorization: localStorage.getItem('access_token')}})
				setAllPetsList(data)
			} catch (error) {
				setError(error)
			} finally {
				setLoadingPets(false)
			}
		}
		fetch()
	}, [])

	return <petsContext.Provider value={{setAllPetsList, test, allPetsList, loadingPets}}>{children}</petsContext.Provider>
}

export default PetsContextProvider
