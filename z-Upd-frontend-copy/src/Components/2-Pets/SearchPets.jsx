import {Center, SimpleGrid} from '@chakra-ui/react'
import React, {useContext, useEffect} from 'react'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import PetsCardsDisplay from './PetsCardsDisplay'

const SearchPets = () => {
	const {allPets, loadingUserPets} = useContext(petsContext)

	if (loadingUserPets) return <>Loading...</>

	return (
		<Center>
			{allPets && (
				<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
					{allPets.map((pet) => {
						return <PetsCardsDisplay pet={pet} key={pet._id} />
					})}
				</SimpleGrid>
			)}
		</Center>
	)
}

export default SearchPets
