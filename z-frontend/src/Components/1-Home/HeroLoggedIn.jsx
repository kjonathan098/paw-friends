import {Stack, Flex, Button, Text, VStack, useBreakpointValue} from '@chakra-ui/react'
import {useState} from 'react'
import {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {authContext} from '../../Context/AuthContext'
import hero4 from '../z-Images/hero4.jpeg'
import {userPetsContext} from '../../Context/UserPetsContext'

export default function HeroLoggedIn() {
	const {userInfo, loading} = useContext(authContext)
	const {name} = useContext(userPetsContext)

	const navigate = useNavigate()

	const searchPets = () => {
		navigate('/pets')
	}

	const myPets = () => {
		navigate('/myPets')
	}

	return (
		<Flex w={'full'} h={'100vh'} backgroundImage={hero4} backgroundSize={'cover'} backgroundPosition={'center center'}>
			<VStack w={'full'} justify={'center'} px={useBreakpointValue({base: 4, md: 8})} bgGradient={'linear(to-r, blackAlpha.400, transparent)'}>
				<Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
					<Text color={'white'} fontWeight={900} lineHeight={1.2} fontSize={useBreakpointValue({base: '5xl', md: '7xl'})}>
						Hi there {userInfo.name} {userInfo.surName}
					</Text>
					<Text color={'white'} fontWeight={900} lineHeight={1.2} fontSize={useBreakpointValue({base: '3xl', md: '3xl'})}>
						Lets Get Started
					</Text>
					<Stack direction={'row'}>
						<Button bg={'green.400'} rounded={'full'} color={'white'} _hover={{bg: 'green.500'}} onClick={searchPets}>
							Search Pets
						</Button>
						<Button bg={'whiteAlpha.300'} rounded={'full'} color={'white'} _hover={{bg: 'whiteAlpha.500'}} onClick={myPets}>
							My Pets
						</Button>
					</Stack>
				</Stack>
			</VStack>
		</Flex>
	)
}
