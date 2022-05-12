import React, {useState} from 'react'
import {Box, Center, useColorModeValue, Heading, Text, Stack, Image, Modal, ModalOverlay, ModalContent, useDisclosure} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'
import LoginForm from '../2-AuthModal/LoginForm'
import CustomModal from './PetInfoModal'
import PetInfoModal from './PetInfoModal'
import SearchAllPetsModal from './PetInfoModalBody-search'
import PetInfoModalBody from './PetInfoModalBody'

const IMAGE = 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

const PetsCards = ({pet}) => {
	const [openPet, setOpenPet] = useState(false)
	const {isOpen, onOpen, onClose} = useDisclosure()

	const divInfo = (id) => {
		setOpenPet(true)
		console.log('henlo')
	}

	let adoptionStatus = null

	switch (pet.adoptionStatus) {
		case 2:
			adoptionStatus = 'Adopted'
			break
		case 1:
			adoptionStatus = 'Fostered'

			break
		default:
			adoptionStatus = 'Available'
	}

	return (
		<Box role={'group'} p={6} maxW={'330px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} pos={'relative'}>
			<Box boxShadow="md">
				<Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={IMAGE} />
			</Box>
			<Stack pt={10} align={'center'}>
				<Text color={'green.500'} fontSize={'sm'} textTransform={'uppercase'}>
					{adoptionStatus}
				</Text>
				<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
					{pet.name}
				</Heading>
				<Stack direction={'row'} align={'center'}>
					<ViewMoreButton onOpen={onOpen} />
					<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
						<PetInfoModal pet={pet} status={adoptionStatus} />
					</Modal>
				</Stack>
			</Stack>
		</Box>
	)
}

export default PetsCards
