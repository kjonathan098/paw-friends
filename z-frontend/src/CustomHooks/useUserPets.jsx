import React, {useContext, useEffect, useState} from 'react'
import {authContext} from '../Context/AuthContext'
import useFetch from './apiCalls/useFetch'

function useUserPets(pet) {
	const [isFavorite, setIsFavorite] = useState(false)
	const [adoptedByUser, setAdoptedByUser] = useState(false)
	const [fosteredByUser, setFosteredByUser] = useState(false)

	const [userFavorites, setUserFavorites] = useState()
	const [settled, seSettled] = useState(false)

	const {userInfo} = useContext(authContext)

	const {data, error} = useFetch(`http://localhost:4000/api/pet/userPets/${userInfo.uid}`)

	useEffect(() => {
		const isFavorite = data?.data?.favoritePet?.find((data) => data._id === pet._id)
		if (isFavorite) setIsFavorite(true)

		const adoptedByUser = data?.data?.adoptedPet?.find((data) => data._id === pet._id)
		if (adoptedByUser && pet.adoptionStatus === 2) return setAdoptedByUser(true)
		else if (adoptedByUser && pet.adoptionStatus === 1) return setFosteredByUser(true)
		seSettled(true)
	}, [data])

	return {isFavorite, adoptedByUser, settled, setAdoptedByUser, setIsFavorite, setFosteredByUser, fosteredByUser}
}

export default useUserPets
