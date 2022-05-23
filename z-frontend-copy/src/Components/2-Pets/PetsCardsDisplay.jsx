import {Box, Heading, Text, Stack, Image, Modal, useDisclosure, Skeleton, ModalOverlay, ModalContent, ModalBody, Button} from '@chakra-ui/react'
import React, {useState} from 'react'
import {useEffect} from 'react'
import usePetStatus from '../../CustomHooks/PetManipulation/usePetStatus'
import usePetStatusTwo from '../../CustomHooks/PetManipulation/usePetStatusTwo'
import PetModal from './PetModal'
const IMAGE = 'https://source.unsplash.com/yihlaRCCvd4'

const PetsCardsDisplay = ({pet}) => {
	const {isOpen, onOpen, onClose} = useDisclosure()


	usePetStatus(pet)

	// console.log(petStatus)

	const [petStatus, setPetStatus] = useState()

	return (
		<Box role={'group'} p={6} maxW={'330px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} pos={'relative'}>
			<Box boxShadow="md">
				<Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={IMAGE} />
			</Box>
			<Stack pt={10} align={'center'}>
				<Text color={'green.500'} fontSize={'sm'} textTransform={'uppercase'}>
					{pet.statusString}
				</Text>
				<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
					{pet.name}
				</Heading>
				<Stack direction={'row'} align={'center'}>
					<Button onClick={onOpen} bg={'green.400'} rounded={'full'} color={'white'} _hover={{bg: 'green.500'}} boxShadow="xl" mt={'2'}>
						View More
					</Button>
					<Modal isOpen={isOpen} onClose={onClose} size={'xl'} isCentered>
						<ModalOverlay />
						<ModalContent>
							<ModalBody>
								<PetModal pet={pet} onClose={onClose} />
							</ModalBody>
						</ModalContent>
					</Modal>
				</Stack>
			</Stack>
		</Box>
	)
}

export default PetsCardsDisplay
