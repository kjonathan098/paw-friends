import React from 'react'
import {useState} from 'react'
import {loginModalContext} from './LoginModalContext'
import {useDisclosure} from '@chakra-ui/react'

const LoginModalProvider = ({children}) => {
	const [name, setName] = useState('John')
	const {isOpen, onOpen, onClose} = useDisclosure()

	return <loginModalContext.Provider value={{isOpen, onOpen, onClose}}>{children}</loginModalContext.Provider>
}

export default LoginModalProvider
