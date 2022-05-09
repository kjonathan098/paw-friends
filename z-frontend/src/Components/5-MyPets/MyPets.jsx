import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {authContext} from '../../Context/AuthContext'
import {useState} from 'react'
import {Box, Center, useColorModeValue, Heading, Text, Stack, Image, SimpleGrid} from '@chakra-ui/react'
import {Grid, GridItem} from '@chakra-ui/react'

const MyPets = () => {
	const authData = useContext(authContext)
	const [userPets, setUserPets] = useState()
	const IMAGE = 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

	useEffect(() => {
		const fetchUserPets = async () => {
			console.log('hello')
			let userInfo = localStorage.getItem('user_info')
			userInfo = JSON.parse(userInfo)
			console.log(userInfo)
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
						return (
							<Box role={'group'} p={6} maxW={'330px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} pos={'relative'}>
								<Box boxShadow="md">
									<Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={IMAGE} />
								</Box>
								<Stack pt={10} align={'center'}>
									<Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
										Brand
									</Text>
									<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
										Nice Chair, pink
									</Heading>
									<Stack direction={'row'} align={'center'}>
										<Text fontWeight={800} fontSize={'xl'}>
											$57
										</Text>
										<Text textDecoration={'line-through'} color={'gray.600'}>
											$199
										</Text>
									</Stack>
								</Stack>
							</Box>
						)
					})}
			</SimpleGrid>
		</Center>
	)
}

export default MyPets
