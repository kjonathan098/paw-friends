import React, {useState} from 'react'
import {Box, Heading, Text, Stack, Image, Modal, useDisclosure, Skeleton} from '@chakra-ui/react'
import ViewMoreButton from '../../UI_Kit/ViewMoreButton'

import PetInfoModal from './PetInfoModal'

const IMAGE = 'https://source.unsplash.com/yihlaRCCvd4'

const PetsCards = ({pet}) => {
	const {isOpen, onOpen, onClose} = useDisclosure()

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
		<Skeleton isLoaded>
			<Box role={'group'} p={6} maxW={'330px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'lg'} pos={'relative'} key={pet._id}>
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
		</Skeleton>
	)
}

export default PetsCards
