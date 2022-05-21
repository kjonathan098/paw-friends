import {Center, SimpleGrid} from '@chakra-ui/react'
import React, {useContext, useEffect} from 'react'
import authContext from '../../Context/AuthContext/AuthContext'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'
import PetsCardsDisplay from './PetsCardsDisplay'

const MyFavorites = () => {
	const {isLoggedIn, loading} = useContext(authContext)
	const {loadingUserPets, userFavorites} = useContext(petsContext)

	if (loading || loadingUserPets) return <>Loading...</>

	if (!isLoggedIn) return <Center h={'100vh'}>Please Login Bitch...</Center>

	if (!userFavorites || !userFavorites.length) return <Center h={'100vh'}>No Favorites Pets</Center>

	return (
		<Center>
			{userFavorites && (
				<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
					{userFavorites.map((pet) => {
						return <PetsCardsDisplay pet={pet} key={pet._id} />
					})}
				</SimpleGrid>
			)}
		</Center>
	)
}

export default MyFavorites
