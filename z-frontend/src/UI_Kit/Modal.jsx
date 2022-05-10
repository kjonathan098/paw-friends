import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'

function CustomModal(props) {
	const {isOpen, onOpen, onClose} = useDisclosure()
	return (
		<>
			<Button onClick={onOpen}>Open Modal</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{props.header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{props.body}</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CustomModal
