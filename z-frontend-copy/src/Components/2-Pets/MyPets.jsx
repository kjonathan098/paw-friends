import {Center, SimpleGrid} from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {useContext} from 'react'
import authContext from '../../Context/AuthContext/AuthContext'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import LoginAlert from '../../UI_Kit/LoginAlert'
import PetsCardsDisplay from './PetsCardsDisplay'

const MyPets = () => {
	const {isLoggedIn} = useContext(authContext)
	const {loadingUserPets, userAdoptedPet, fetchUserPets} = useContext(petsContext)
	console.log(loadingUserPets)

	useEffect(() => {
		console.log('fetching my pets')
		fetchUserPets()
	}, [])

	if (!isLoggedIn) return <LoginAlert />

	if (loadingUserPets) return <>Loading...</>

	if (!userAdoptedPet || !userAdoptedPet.length) return <Center h={'100vh'}>No Pets</Center>
	return (
		<Center>
			{userAdoptedPet && (
				<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
					{userAdoptedPet.map((pet) => {
						return <PetsCardsDisplay pet={pet} key={pet._id} />
					})}
				</SimpleGrid>
			)}
		</Center>
	)
}

export default MyPets
