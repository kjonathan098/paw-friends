import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {useState} from 'react'
import {petsContext} from '../Context/PetsContext'

const usePetHook = () => {
	const {setAllPetsList} = useContext(petsContext)

	const petHandler = {
		// fetch Pets
		fetchPets: async () => {
			try {
				const res = await axios.get(`http://localhost:4000/api/pet/`, {headers: {Authorization: localStorage.getItem('access_token')}})
				setAllPetsList(res.data)
			} catch (error) {
				return {error: true, message: error.message}
			}
		},
	}

	useEffect(() => {
		const fetchPets = async () => {
			const res = await petHandler.fetchPets()
			setAllPetsList(res.data)
		}
		fetchPets()
	}, [])
	return {petHandler}
}

export default usePetHook
