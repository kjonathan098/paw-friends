import {Modal, ModalOverlay, ModalContent, useDisclosure} from '@chakra-ui/react'
import React, {useContext, useState} from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import {loginModalContext} from '../../Context/LoginModalContext'
import axios from 'axios'

const AuthModal = () => {
	const [modalContent, setModalContent] = useState(true)
	const {isOpen, test, onClose} = useContext(loginModalContext)

	console.log('test')

	console.log(test)
	console.log(isOpen)

	// Close Modal from click Event when modal is Opened
	const switchFormContent = () => {
		setModalContent(!modalContent)
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>{modalContent ? <LoginForm switchFormContent={switchFormContent} /> : <RegisterForm switchFormContent={switchFormContent} />}</ModalContent>
		</Modal>
	)
}

export default AuthModal
