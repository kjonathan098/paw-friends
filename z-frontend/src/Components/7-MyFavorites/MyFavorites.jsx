import {Center, SimpleGrid} from '@chakra-ui/react'
import axios from 'axios'
import React, {useContext, useState} from 'react'
import {useEffect} from 'react'
import {userPetsContext} from '../../Context/UserPetsContext'
import useUserPets from '../../CustomHooks/useUserPets'
import AnewPetsCards from '../4-Pets/A.newPetCardsGrid'

const MyFavorites = () => {
	const {userFavoritePets, name, loading} = useContext(userPetsContext)

	if (loading) return <>loading</>
	return (
		<div>
			{userFavoritePets && (
				<Center>
					<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
						{userFavoritePets.map((pet) => {
							return <AnewPetsCards pet={pet} />
						})}
					</SimpleGrid>
				</Center>
			)}
		</div>
	)
}

export default MyFavorites
