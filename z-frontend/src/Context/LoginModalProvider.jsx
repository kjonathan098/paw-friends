import React from 'react'
import {useState} from 'react'
import {loginModalContext} from './LoginModalContext'
import {useDisclosure} from '@chakra-ui/react'

const LoginModalProvider = ({children}) => {
	const {isOpen, onOpen, onClose} = useDisclosure()

	const test = 'test'

	return <loginModalContext.Provider value={{isOpen, onOpen, onClose, test}}>{children}</loginModalContext.Provider>
}

export default LoginModalProvider
