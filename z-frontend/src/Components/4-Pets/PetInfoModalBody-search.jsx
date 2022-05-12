import {Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import axios from 'axios'
import {useEffect} from 'react'
import {useState} from 'react'
import {useToast} from '@chakra-ui/react'

export default function SearchAllModalBody({pet, status}) {
	const toast = useToast()

	const [adopted, setAdopted] = useState(false)
	const [fostered, setFostered] = useState(false)
	const [petUnavailable, setpetUnavailable] = useState(false)
	console.log(pet.adoptionStatus)
	console.log(petUnavailable)

	useEffect(() => {
		if (pet.adoptionStatus === 2 || 1) {
			setpetUnavailable(true)
		} else setpetUnavailable(false)
	}, [])

	const returnPet = async () => {
		try {
			const res = await axios.post(`http://localhost:4000/api/pet/${pet._id}/return`, {request: 'return'}, {headers: {Authorization: localStorage.getItem('access_token')}})
			toast({
				title: res.data,
				status: 'success',
				duration: 9000,
				isClosable: true,
			})
			setFostered(true)
		} catch (error) {
			console.log(error)
		}
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
						{/* <Button
							flex={1}
							fontSize={'sm'}
							rounded={'full'}
							_focus={{
								bg: 'gray.200',
							}}
							onClick={returnPet}
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
						>
							Adopt
						</Button> */}
						{petUnavailable && <Badge colorScheme="yellow">Pet already in a cozy home!</Badge>}
					</Stack>
				</Stack>
			</Stack>
		</Center>
	)
}
