import React from 'react'
import {Button, HStack, Icon, IconButton, Modal, ModalContent, ModalOverlay, Td, Tr, useDisclosure} from '@chakra-ui/react'
import {BsBoxArrowUpRight, BsFillTrashFill} from 'react-icons/bs'
import {AiFillEdit, AiTwotoneLock} from 'react-icons/ai'
import AddPetModal from './10-AddPetModal'
import PetModalEdit from './12-PetModalEdit'
const PetTableBody = ({pet}) => {
	const {isOpen, onOpen, onClose} = useDisclosure()

	return (
		<>
			<Tr>
				<Td>{pet.name}</Td>
				<Td>{pet._id}</Td>
				<Td>
					<HStack>
						<Button size="xs" variant="solid" leftIcon={<Icon as={AiTwotoneLock} />} colorScheme="purple" onClick={onOpen}>
							View Profile
						</Button>
					</HStack>
				</Td>
				<PetModalEdit pet={pet} isOpen={isOpen} onClose={onClose} />
			</Tr>
		</>
	)
}

export default PetTableBody
