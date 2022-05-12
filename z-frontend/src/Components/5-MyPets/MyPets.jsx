import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {authContext} from '../../Context/AuthContext'
import {useState} from 'react'
import {Box, Center, useColorModeValue, Heading, Text, Stack, Image, SimpleGrid} from '@chakra-ui/react'
import {Grid, GridItem} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'
import ErrorAlert from '../../UI_Kit/ErrorAlert'
import MyPetsCards from '../4-Pets/PetsCards'

const MyPets = () => {
	const authData = useContext(authContext)
	const [userPets, setUserPets] = useState()

	useEffect(() => {
		const fetchUserPets = async () => {
			let userInfo = localStorage.getItem('user_info')
			userInfo = JSON.parse(userInfo)
			try {
				const res = await axios.get(`http://localhost:4000/api/pet/userPets/${userInfo.uid}`)
				setUserPets(res.data.adoptedPets)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchUserPets()
	}, [])

	if (!userPets) return <div>No Pets</div>

	return (
		<Center>
			<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
				{userPets &&
					userPets.map((pet) => {
						return <MyPetsCards pet={pet} />
					})}
			</SimpleGrid>
		</Center>
	)
}

export default MyPets
