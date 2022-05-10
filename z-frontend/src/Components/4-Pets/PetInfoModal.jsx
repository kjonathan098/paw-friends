import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Center} from '@chakra-ui/react'
import PetInfoModalBody from './PetInfoModalBody'

function PetInfoModal({pet}) {
	const {isOpen, onOpen, onClose} = useDisclosure()

	return (
		<>
			<ModalOverlay />
			<ModalContent>
				<ModalBody>
					<PetInfoModalBody pet={pet} />
				</ModalBody>
			</ModalContent>
		</>
	)
}

export default PetInfoModal
