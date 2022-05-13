import {Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, Tooltip, useColorModeValue} from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'
import {IconButton} from '@chakra-ui/react'
import axios from 'axios'
import {useEffect, useMemo} from 'react'
import {useState} from 'react'
import {useToast} from '@chakra-ui/react'
import handlePetRequest from '../../Config/Pet.Config'
import {useContext} from 'react'
import {userPetsContext} from '../../Context/UserPetsContext'
import {authContext} from '../../Context/AuthContext'

export default function SearchAllModalBody({pet, status}) {
	const toast = useToast()
	const [success, setSuccess] = useState()
	const [error, setError] = useState()
	const [petUnavailable, setpetUnavailable] = useState(false)
	const [petStatus, setPetStatus] = useState()
	const [isFavorite, setIsFavorite] = useState(false)
	const [adoptedByUser, setAdoptedByUser] = useState(false)
	const [fosterByUser, setFosterByUser] = useState(false)
	const [returnPet, setReturnPet] = useState(false)

	const {userFavoritePets, getUserPets, userAdoptedPets} = useContext(userPetsContext)
	const {userInfo} = useContext(authContext)

	useEffect(() => {
		console.dir('use Effecto')
		console.dir(pet.adoptionStatus)

		// If pet is unavailable disable buttons
		switch (pet.adoptionStatus) {
			case 2:
				setpetUnavailable(true)
				break
			case 1:
				setpetUnavailable(true)
				break
			default:
				setpetUnavailable(false)

				break
		}

		console.dir(pet.adoptionStatus)

		// if user doesnt have a  doc in collection user.pets this will come undef
		if (!userFavoritePets && !userAdoptedPets) return

		// if user have a doc in collection user.pets but array is empty
		if (!userFavoritePets.length && !userAdoptedPets.length) return

		// Find if user favorited this pet
		const favorite = userFavoritePets.find((data) => data._id === pet._id)
		if (favorite) setIsFavorite(true)

		// Find if user has adopted this pet
		const adoptedByUser = userAdoptedPets.find((data) => data._id === pet._id)
		if (adoptedByUser) setAdoptedByUser(true)

		// Find if user has fostered this pet
		const fosteredByUser = userAdoptedPets.find((data) => data._id === pet._id)
		if (fosteredByUser) setFosterByUser(true)
	}, [])

	// NEED TO FIX DINAMICALLY CHANGIN PET MODAL ACCRODING TO STATUS

	// NEED TO FIX WHAT ACTIONS TO TAKE AFTER USER ADOPTED/FOSTERED PET

	const handdleReturnPet = async () => {
		const res = await handlePetRequest.returnPet(pet)
		if (res) setSuccess('Pet returned to shelter')
		setpetUnavailable(false)
		setAdoptedByUser(false)
		getUserPets(userInfo.uid)
	}

	const adoptPet = async () => {
		const res = await handlePetRequest.adoptPet(pet)
		if (res.error) return setError(res.message)
		setAdoptedByUser(true)
		setpetUnavailable(true)
		setSuccess(res)
		getUserPets(userInfo.uid)
	}

	const fosterPet = async () => {
		const res = await handlePetRequest.fosterPet(pet)
		if (res.error) return setError(res.message)
		setSuccess(res)
		getUserPets(userInfo.uid)
	}

	const addToFavorites = async () => {
		const res = await handlePetRequest.addToFavorites(pet)
		console.log('hellor')
		if (res.error) return setError(res.message)
		setIsFavorite(true)
		setSuccess(res)
		getUserPets(userInfo.uid)
	}

	const removeFromFavorites = async () => {
		const res = await handlePetRequest.removeFromFavorites(pet)
		console.log(res)
		if (res.error) return setError(res.message)
		setSuccess(res)
		setIsFavorite(false)
		getUserPets(userInfo.uid)
	}

	return (
		<Center py={6}>
			<Stack borderWidth="1px" borderRadius="lg" w={{sm: '100%', md: '540px'}} height={{sm: '476px', md: '20rem'}} direction={{base: 'column', md: 'row'}} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} padding={4}>
				<Flex flex={1} bg="blue.200">
					<Image objectFit="cover" boxSize="100%" src={'https://source.unsplash.com/yihlaRCCvd4'} />
				</Flex>
				<Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
					<Heading fontSize={'2xl'} fontFamily={'body'}>
						{pet.name}
					</Heading>
					<Text fontWeight={600} color={'green.500'} size="sm" mb={4}>
						{status}
					</Text>
					<Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
						{pet.bio}
					</Text>
					<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
						<Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
							{pet.color}
						</Badge>
						<Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
							{pet.height} cm
						</Badge>
						<Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
							{pet.weight} lbs
						</Badge>
					</Stack>

					<Stack width={'100%'} mt={'2rem'} direction={'row'} padding={2} justifyContent={'space-between'} alignItems={'center'}>
						<Button
							flex={1}
							fontSize={'sm'}
							rounded={'full'}
							_focus={{
								bg: 'gray.200',
							}}
							onClick={fosterPet}
							isDisabled={petUnavailable}
						>
							Foster
						</Button>
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
							isDisabled={petUnavailable}
						>
							Adopt
						</Button>

						{adoptedByUser && (
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
					</Stack>
					<Tooltip hasArrow label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} bg="gray.300" color="black">
						<IconButton aria-label="Search database" colorScheme={'green'} variant="outline" isActive={isFavorite} onClick={isFavorite ? removeFromFavorites : addToFavorites} size={'xs'} icon={<StarIcon color={'black'} size={'xs'} />} />
					</Tooltip>
					{success && <Badge colorScheme="green">{success}</Badge>}
					{error && <Badge colorScheme="red">{error}</Badge>}
					{error && <Badge colorScheme="red">{error}</Badge>}
				</Stack>
			</Stack>
		</Center>
	)
}
