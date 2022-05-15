import React, {useEffect, useState} from 'react'
import {Box, Heading, Text, Stack, Image, Modal, useDisclosure, Skeleton, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'

import PetInfoModal from './PetInfoModal'
import SearchAllModalBody from './PetInfoModalBody-search'
import usePetStatus from '../../CustomHooks/usePetStatus'
import AnewPetModal from './A.newPetModal'
import useTRYOUTPetStatus from '../../CustomHooks/useTRYOUTPetStatus copy'

const IMAGE = 'https://source.unsplash.com/yihlaRCCvd4'

const AnewPetsCards = ({pet}) => {
	const {isOpen, onOpen, onClose} = useDisclosure()
	const [petStatus, setPetStatus] = useState('hola')

	switch (pet.adoptionStatus) {
		case 2:
			pet.status = 'Adopted'
			break
		case 1:
			pet.status = 'Fostered'

			break
		case 0:
			pet.status = 'Available'
			break
	}

	// console.log(pet.adoptionStatus, ' status')

	// if (!petStatus) return <>Loading..</>

	return (
		<>
			{petStatus && (
				<Skeleton isLoaded>
					<Box role={'group'} p={6} maxW={'330px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} pos={'relative'} key={pet._id}>
						<Box boxShadow="md">
							<Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={IMAGE} />
						</Box>
						<Stack pt={10} align={'center'}>
							<Text color={'green.500'} fontSize={'sm'} textTransform={'uppercase'}>
								{pet.status}
							</Text>
							<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
								{pet.name}
							</Heading>
							<Stack direction={'row'} align={'center'}>
								<ViewMoreButton onOpen={onOpen} />
								<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
									<ModalOverlay />
									<ModalContent>
										<ModalBody>
											<AnewPetModal pet={pet} petStatusNew={petStatus} test={'tests'} />
										</ModalBody>
									</ModalContent>
								</Modal>
							</Stack>
						</Stack>
					</Box>
				</Skeleton>
			)}
		</>
	)
}

export default AnewPetsCards
