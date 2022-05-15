import useFetch from '../../CustomHooks/apiCalls/useFetch'

import {StarIcon} from '@chakra-ui/icons'
import {IconButton, useTimeout} from '@chakra-ui/react'
import axios from 'axios'
import {useEffect, useMemo} from 'react'
import {useState} from 'react'
import {useToast} from '@chakra-ui/react'
import handlePetRequest from '../../Config/Pet.Config'
import {useContext} from 'react'
import {userPetsContext} from '../../Context/UserPetsContext'
import {authContext} from '../../Context/AuthContext'
import {Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, Tooltip, useColorModeValue} from '@chakra-ui/react'
import useUserPets from '../../CustomHooks/useUserPets'
import usePetStatus from '../../CustomHooks/usePetStatus'
import {petsContext} from '../../Context/PetsContext'
import useTRYOUTPetStatus from '../../CustomHooks/useTRYOUTPetStatus copy'

const AnewPetModal = ({pet, petStatusNew, test}) => {
	const toast = useToast()
	const [success, setSuccess] = useState()
	const [error, setError] = useState()

	const {isFavorite, adoptedByUser, fosteredByUser, settled, setAdoptedByUser, setIsFavorite, setFosteredByUser} = useUserPets(pet)
	const {petStatus, setPetStatus, loading} = usePetStatus(pet.adoptionStatus)
	const {reFetch} = useFetch()

	console.log(petStatus)

	const {allPetsList} = useContext(petsContext)

	// NEED TO FIX DINAMICALLY CHANGIN PET MODAL ACCRODING TO STATUS

	// NEED TO FIX WHAT ACTIONS TO TAKE AFTER USER ADOPTED/FOSTERED PET

	const handdleReturnPet = async () => {
		const res = await handlePetRequest.returnPet(pet)
		if (res.error) return setError(res.message)
		toast({
			title: 'Pet returned to shelter',
			status: 'success',
			duration: 5000,
			isClosable: true,
		})
		setPetStatus({status: 'Available', available: true, petAvailable: true})
		pet.status = 'Available'

		setAdoptedByUser(false)
		setFosteredByUser(false)
	}

	const adoptPet = async () => {
		const res = await handlePetRequest.adoptPet(pet)
		if (res.error) return setError(res.message)
		toast({
			title: 'Adopted',
			description: res,
			status: 'success',
			duration: 5000,
			isClosable: true,
		})
		pet.status = 'Adopted'
		setAdoptedByUser(true)
		setPetStatus({status: 'Adopted', available: false, petAdopted: true})
	}

	const fosterPet = async () => {
		const res = await handlePetRequest.fosterPet(pet)
		if (res.error) return setError(res.message)
		toast({
			title: 'Fostered',
			description: res,
			status: 'success',
			duration: 5000,
			isClosable: true,
		})
		setPetStatus({status: 'Fostered', available: false, petFostered: true})
		setFosteredByUser(true)
	}

	const addToFavorites = async () => {
		const res = await handlePetRequest.addToFavorites(pet)
		if (res.error) return setError(res.message)
		setIsFavorite(true)
	}

	const removeFromFavorites = async () => {
		const res = await handlePetRequest.removeFromFavorites(pet)
		if (res.error) return setError(res.message)
		setIsFavorite(false)
	}

	if (!settled || loading) return <>Loading... </>

	return (
		<>
			{settled && (
				<Center py={6}>
					<Stack borderWidth="1px" borderRadius="lg" w={{sm: '100%', md: '540px'}} height={{sm: '476px', md: '20rem'}} direction={{base: 'column', md: 'row'}} bg={'white'} boxShadow={'2xl'} padding={4}>
						<Flex flex={1} bg="blue.200">
							<Image objectFit="cover" boxSize="100%" src={'https://source.unsplash.com/yihlaRCCvd4'} />
						</Flex>
						<Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
							<Heading fontSize={'2xl'} fontFamily={'body'}>
								{pet.name}
							</Heading>
							<Text fontWeight={600} color={'green.500'} size="sm" mb={4}>
								{pet.status}
							</Text>
							<Text textAlign={'center'} color={'gray.900'} px={3}>
								{pet.bio}
							</Text>
							<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
								<Badge px={2} py={1} bg={'gray.100'} fontWeight={'400'}>
									{pet.color}
								</Badge>
								<Badge px={2} py={1} bg={'gray.100'} fontWeight={'400'}>
									{pet.height} cm
								</Badge>
								<Badge px={2} py={1} bg={'gray.100'} fontWeight={'400'}>
									{pet.weight} lbs
								</Badge>
							</Stack>

							<Stack width={'100%'} mt={'2rem'} direction={'row'} padding={2} justifyContent={'space-between'} alignItems={'center'}>
								{petStatus.available && (
									<Button
										flex={1}
										fontSize={'sm'}
										rounded={'full'}
										bg={'gray.200'}
										_focus={{
											bg: 'gray.300',
										}}
										onClick={fosterPet}
										isDisabled={petStatus.unavailable}
									>
										Foster
									</Button>
								)}
								{(adoptedByUser || fosteredByUser) && (
									<Button
										flex={1}
										fontSize={'sm'}
										rounded={'full'}
										bg={'green.700'}
										color={'white'}
										boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
										_hover={{
											bg: 'green.900',
										}}
										_focus={{
											bg: 'green.1200',
										}}
										onClick={handdleReturnPet}
									>
										Return
									</Button>
								)}

								{(petStatus.petFostered || petStatus.petAvailable) && (
									<Button
										flex={1}
										fontSize={'sm'}
										rounded={'full'}
										bg={'green.400'}
										color={'white'}
										boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
										_hover={{
											bg: 'green.500',
										}}
										_focus={{
											bg: 'green.500',
										}}
										onClick={adoptPet}
										isDisabled={adoptedByUser}
									>
										Adopt
									</Button>
								)}
							</Stack>
							<Tooltip hasArrow label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} bg="gray.300" color="black">
								<IconButton aria-label="Search database" colorScheme={'green'} variant="outline" isActive={isFavorite} size={'xs'} icon={<StarIcon color={'black'} size={'xs'} />} onClick={isFavorite ? removeFromFavorites : addToFavorites} />
							</Tooltip>
							{success && <Badge colorScheme="green">{success}</Badge>}
							{error && <Badge colorScheme="red">{error}</Badge>}
						</Stack>
					</Stack>
				</Center>
			)}
		</>
	)
}

export default AnewPetModal
