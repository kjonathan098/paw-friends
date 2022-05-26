import React, {useState} from 'react'
import {Modal, ModalOverlay, ModalContent, useDisclosure, Select, Box} from '@chakra-ui/react'
import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center, Textarea} from '@chakra-ui/react'
import useForm from '../../../CustomHooks/apiCalls/useForm'
import useToastMessage from '../../../UI_Kit/ToastMessage'
import {useEffect} from 'react'

const PetModalEdit = ({isOpen, onClose, allPets, pet}) => {
	const [values, handleChange, setState] = useForm()
	const [loading, setLoading] = useState()
	const {showToast, errorToast} = useToastMessage()

	console.log(pet)

	const intitialState = {name: pet.name, type: pet.type, adoptionStatus: pet.adoptionStatus, bio: pet.bio, breed: pet.breed, color: pet.color, dietaryRestrictions: pet.dietaryRestrictions, height: pet.height, hypoallergenic: pet.hypoallergenic, weight: pet.weight}

	useEffect(() => {
		setState(intitialState)
		console.log(values)
	}, [])

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Flex align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
					<Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={4}>
						<Heading lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
							Add New Pet
						</Heading>
						<FormControl id="picture">
							<FormLabel>Add Pet Picture</FormLabel>
							<Stack direction={['column', 'row']} spacing={6}>
								<Center>
									<Avatar size="xl" src="https://bit.ly/sage-adebayo"></Avatar>
								</Center>
								<Center w="full">
									<Button w="full">Add Picture</Button>
								</Center>
							</Stack>
						</FormControl>
						<FormControl id="petName" isRequired>
							<FormLabel>Pet name</FormLabel>
							<Input placeholder="Pet Name" _placeholder={{color: 'gray.500'}} type="text" name="name" onChange={handleChange} value={values.name} />
						</FormControl>
						<FormControl id="petType" isRequired>
							<HStack w={'100%'}>
								<Box w={'100%'}>
									<FormLabel>Pet Type</FormLabel>
									<Select name="type" onChange={handleChange} placeholder="Select" value={values.type}>
										<option value={1}>Dog</option>
										<option value={2}>Cat</option>
									</Select>
								</Box>
								<Box w={'100%'}>
									<FormLabel>Status</FormLabel>
									<Select name="adoptionStatus" onChange={handleChange} placeholder="Select" value={values.adoptionStatus}>
										<option value={0}>Available</option>
										<option value={1}>Fostered</option>
										<option value={2}>Adopted</option>
									</Select>
								</Box>
							</HStack>
						</FormControl>
						<FormControl id="breed" isRequired>
							<FormLabel>Breed</FormLabel>
							<Input placeholder="Breed" _placeholder={{color: 'gray.500'}} type="text" name="breed" onChange={handleChange} value={values.breed} />
						</FormControl>
						<FormControl id="color" isRequired>
							<FormLabel>Color</FormLabel>
							<Input placeholder="Color" _placeholder={{color: 'gray.500'}} type="text" name="color" onChange={handleChange} value={values.color} />
						</FormControl>
						<FormControl id="height" isRequired>
							<HStack w={'100%'}>
								<Box w={'100%'}>
									<FormLabel>Height cm</FormLabel>
									<Input placeholder="weight" _placeholder={{color: 'gray.500'}} type="number" name="height" onChange={handleChange} value={values.height} />
								</Box>
								<Box w={'100%'}>
									<FormLabel>Weight lbs</FormLabel>
									<Input placeholder="Height" _placeholder={{color: 'gray.500'}} type="number" name="weight" onChange={handleChange} value={values.weight} />
								</Box>
							</HStack>
						</FormControl>
						<FormControl id="allergic" isRequired>
							<FormLabel>Hypoallergic</FormLabel>
							<Select name="hypoallergenic" onChange={handleChange} placeholder="Select" value={values.hypoallergenic}>
								<option value={false}>No</option>
								<option value={true}>Yes</option>
							</Select>{' '}
						</FormControl>
						<FormControl id="diet" isRequired>
							<FormLabel>Dietary Restrictions</FormLabel>
							<Textarea placeholder="Dietary Restrictions" _placeholder={{color: 'gray.500'}} type="text" name="dietaryRestrictions" onChange={handleChange} value={values.dietaryRestrictions} />
						</FormControl>
						<FormControl id="bio">
							<FormLabel>Bio</FormLabel>
							<Textarea placeholder="Bio" _placeholder={{color: 'gray.500'}} type="text" name="bio" onChange={handleChange} value={values.bio} />
						</FormControl>

						<Stack spacing={6} direction={['column', 'row']}>
							<Button
								bg={'red.400'}
								color={'white'}
								w="full"
								_hover={{
									bg: 'red.500',
								}}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button
								bg={'blue.400'}
								color={'white'}
								w="full"
								_hover={{
									bg: 'blue.500',
								}}
								isLoading={loading}
							>
								Submit
							</Button>
						</Stack>
					</Stack>
				</Flex>
			</ModalContent>
		</Modal>
	)
}

export default PetModalEdit
