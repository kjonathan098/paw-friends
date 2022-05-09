import React, {useContext} from 'react'
import {Button} from '@chakra-ui/react'
import {loginModalContext} from '../Context/LoginModalContext'
import {authContext} from '../Context/AuthContext'

const LoginButton = () => {
	const loginModalSwitcher = useContext(loginModalContext)
	const {isLoggedIn} = useContext(authContext)

	if (isLoggedIn) return null

	return (
		<Button bg={'green.400'} rounded={'full'} color={'white'} _hover={{bg: 'green.500'}} onClick={loginModalSwitcher.onOpen}>
			Login
		</Button>
	)
}

export default LoginButton
