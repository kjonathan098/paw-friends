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
	const {isLoggedIn, loading, userInfo} = useContext(authContext)
	const [userPets, setUserPets] = useState()

	const {loadingUserPets, userAdoptedPet} = useContext(petsContext)

	// DOESNT WORK BUT MOST NEAT
	// const {data: pets, fetchLoading, error, reFetch} = useFetch(`http://localhost:4000/api/pet/${userInfo?.uid}`, {enabled: !!userInfo?.uid})
	// console.log(pets)

	// WORKS DOESNT LOOK SO NICE

	// let user = localStorage.getItem('user_info')
	// user = JSON.parse(user)
	// const uid = user.uid

	// const {data: pets, fetchLoading, error, reFetch} = useFetch(`http://localhost:4000/api/pet/${uid}`)

	// ALSO WORKS CANT USE MY USEFETCH HOOK
	// useEffect(() => {
	// 	const fetchPets = async () => {
	// 		if (!userInfo) return
	// 		const userPets = await axios.get(`http://localhost:4000/api/pet/userPets/${userInfo.uid}`)
	// 		// console.log(userPets)

	// 		setUserPets(userPets.data.adoptedPet)
	// 	}
	// 	fetchPets()
	// }, [userInfo])

	if (loading || loadingUserPets) return <>Loading...</>

	if (!isLoggedIn) return <LoginAlert />

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
