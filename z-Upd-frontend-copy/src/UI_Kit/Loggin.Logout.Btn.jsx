import {Box, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Center, useDisclosure, useToast} from '@chakra-ui/react'
import React from 'react'
import {useContext} from 'react'
import authContext from '../Context/AuthContext/AuthContext'
import loginModalContext from '../Context/AuthContext/LoginModalContext/LoginModalContext'
import userConfig from '../Config/User.Config'

const AuthButton = () => {
	const {isLoggedIn, setLoading, setIsLoggedIn} = useContext(authContext)
	const {isOpen, onOpen, onClose} = useContext(loginModalContext)
	const toast = useToast()

	const handleLogout = () => {
		setLoading(true)
		userConfig.logoutUser()
		setIsLoggedIn(false)
		toast({
			title: 'Success',
			description: "You've logged out",
			status: 'warning',
			duration: 5000,
			isClosable: true,
		})
		setLoading(false)
	}

	if (isLoggedIn)
		return (
			<Menu>
				<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
					<Avatar size={'sm'} src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'} />
				</MenuButton>
				<MenuList>
					<MenuItem>My Pets</MenuItem>
					<MenuItem>Profile</MenuItem>
					<MenuDivider />
					<MenuItem>
						<Center width={'100%'}>
							<Box as="button" bg={'red.400'} rounded={'full'} color={'white'} _hover={{bg: 'red.500'}} w={'80%'} onClick={handleLogout}>
								Logout
							</Box>
						</Center>
					</MenuItem>
				</MenuList>
			</Menu>
		)

	return (
		<Button bg={'green.400'} rounded={'full'} color={'white'} _hover={{bg: 'green.500'}} onClick={onOpen}>
			Login
		</Button>
	)
}

export default AuthButton
