import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import {authContext} from '../../Context/AuthContext'
import {useState} from 'react'
import {Box, Center, useColorModeValue, Heading, Text, Stack, Image, SimpleGrid} from '@chakra-ui/react'
import {Grid, GridItem} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'
import ErrorAlert from '../../UI_Kit/ErrorAlert'
import PetsCards from '../4-Pets/PetsCards'
import {petsContext} from '../../Context/PetsContext'
import usePetHook from '../../CustomHooks/usePetHook'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import AnewPetsCards from '../4-Pets/A.newPetCardsGrid'

const IMAGE = 'https://source.unsplash.com/yihlaRCCvd4'

const AnewSearchPetsMain = () => {
	const {allPetsList, loadingPets} = useContext(petsContext)

	if (loadingPets) return <>Loading....</>

	return (
		<Center>
			{allPetsList && (
				<SimpleGrid columns={{sm: 1, md: 2, lg: 3}} mt={'10'} bg={'white'} spacing="8">
					{allPetsList.data.map((pet) => {
						return <AnewPetsCards pet={pet} />
					})}
				</SimpleGrid>
			)}
		</Center>
	)
}
export default AnewSearchPetsMain
