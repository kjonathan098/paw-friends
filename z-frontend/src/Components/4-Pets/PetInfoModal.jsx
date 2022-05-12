import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Center} from '@chakra-ui/react'
import PetInfoModalBody from './PetInfoModalBody'
import SearchAllModalBody from './PetInfoModalBody-search'

function PetInfoModal({pet, status}) {
	const {isOpen, onOpen, onClose} = useDisclosure()

	return (
		<>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<SearchAllModalBody pet={pet} status={status} />
				</ModalBody>
			</ModalContent>
		</>
	)
}

export default PetInfoModal
