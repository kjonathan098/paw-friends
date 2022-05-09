import React, {useContext} from 'react'
import {Box, Flex, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Center} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {authContext} from '../../Context/AuthContext'

const NavLoggedIn = () => {
	const {isLoggedIn, handdleLogout} = useContext(authContext)
	const navigate = useNavigate()

	const myProfile = () => {
		navigate('/profile')
	}

	const myPets = () => {
		navigate('/myPets')
	}

	if (!isLoggedIn) return null
	else
		return (
			<Menu>
				<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
					<Avatar size={'sm'} src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'} />
				</MenuButton>
				<MenuList>
					<MenuItem onClick={myPets}>My Pets</MenuItem>
					<MenuItem onClick={myProfile}>Profile</MenuItem>
					<MenuDivider />
					<MenuItem>
						<Center width={'100%'}>
							<Box as="button" bg={'red.400'} rounded={'full'} color={'white'} _hover={{bg: 'red.500'}} w={'80%'} onClick={handdleLogout}>
								Logout
							</Box>
						</Center>
					</MenuItem>
				</MenuList>
			</Menu>
		)
}

export default NavLoggedIn
