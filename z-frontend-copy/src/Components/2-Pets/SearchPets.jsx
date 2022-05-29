import {Box, Center, SimpleGrid} from '@chakra-ui/react'
import React, {useContext, useEffect, useState} from 'react'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import SearchBarMain from '../3-SearchBar/SearchBarMain'
import PetsCardsDisplay from './PetsCardsDisplay'

const SearchPets = () => {
	const {allPets, loading, fetchAll, fetchUserPets} = useContext(petsContext)

	console.log('rounds')

	useEffect(() => {
		fetchAll()
	}, [])
	if (loading) return <>Loading...</>

	return (
		<Box>
			<Center mt={5}>
				<SearchBarMain />
			</Center>

			<Center>
				{allPets && (
					<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
						{allPets.map((pet) => {
							return <PetsCardsDisplay pet={pet} key={pet._id} />
						})}
					</SimpleGrid>
				)}
			</Center>
		</Box>
	)
}

export default SearchPets
