import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {authContext} from '../../Context/AuthContext'
import {useState} from 'react'
import {Box, Center, useColorModeValue, Heading, Text, Stack, Image, SimpleGrid} from '@chakra-ui/react'
import {Grid, GridItem} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'
import ErrorAlert from '../../UI_Kit/ErrorAlert'
import PetsCards from '../4-Pets/PetsCards'
import {userPetsContext} from '../../Context/UserPetsContext'

const MyPets = () => {
	const authData = useContext(authContext)
	const [userPets, setUserPets] = useState(false)
	const [loading, setLoading] = useState(false)

	const {userAdoptedPets} = useContext(userPetsContext)

	useEffect(() => {
		setLoading(true)
		if (!userAdoptedPets) return setLoading(false)

		if (userAdoptedPets.length) setUserPets(true)
		setLoading(false)
		return () => {}
	}, [userAdoptedPets])

	if (loading) return <div>Loading</div>

	if (!userAdoptedPets || userAdoptedPets.length <= 0) return <div>No Pets</div>

	return (
		<Center>
			<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
				{userAdoptedPets &&
					userAdoptedPets.map((pet) => {
						return <PetsCards pet={pet} />
					})}
			</SimpleGrid>
		</Center>
	)
}

export default MyPets
