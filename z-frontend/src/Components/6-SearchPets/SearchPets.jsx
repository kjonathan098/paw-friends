import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {authContext} from '../../Context/AuthContext'
import {useState} from 'react'
import {Box, Center, useColorModeValue, Heading, Text, Stack, Image, SimpleGrid} from '@chakra-ui/react'
import {Grid, GridItem} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'
import ErrorAlert from '../../UI_Kit/ErrorAlert'
import MyPetsCards from '../4-Pets/PetsCards'

const IMAGE = 'https://source.unsplash.com/yihlaRCCvd4'

const SearchPets = () => {
	const [pets, setPets] = useState()
	console.log(pets)
	useEffect(() => {
		const fetchPets = async () => {
			try {
				const res = await axios.get(`http://localhost:4000/api/pet/`, {headers: {Authorization: localStorage.getItem('access_token')}})
				console.log(res)
				setPets(res.data)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchPets()
	}, [])
	return (
		<Center>
			<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
				{pets &&
					pets.map((pet) => {
						return <MyPetsCards pet={pet} />
					})}
			</SimpleGrid>
		</Center>
	)
}

export default SearchPets
