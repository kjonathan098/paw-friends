import React, {useEffect} from 'react'
import {useState} from 'react'
import {SmallCloseIcon} from '@chakra-ui/icons'
import {useContext} from 'react'
import {authContext} from '../../Context/AuthContext'
import AuthProvider from '../../Context/AuthProvider'
import axios from 'axios'
import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center, Badge} from '@chakra-ui/react'
import useProfileHook from '../y-CustomHooks/profile'

const Profile = () => {
	const authData = useContext(authContext)
	const [error, setError] = useState()

	const {email, handleEmail, handleName, name, phone, handlePhone, handleBio, bio} = useProfileHook()

	const getToken = localStorage.getItem('access_token')

	const editProfile = async () => {
		setError(null)
		try {
			const res = await axios.put(`http://localhost:4000/api/user/${authData.userInfo.uid}`, {name, email, phone, bio}, {headers: {Authorization: localStorage.getItem('access_token')}})
			console.log(res)
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	return (
		<Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
				<Heading lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
					{name}
				</Heading>
				<FormControl id="userName">
					<FormLabel>User name</FormLabel>
					<Input placeholder="UserName" _placeholder={{color: 'gray.500'}} type="text" value={name} onChange={handleName} />
				</FormControl>
				<FormControl id="email">
					<FormLabel>Email address</FormLabel>
					<Input placeholder="your-email@example.com" _placeholder={{color: 'gray.500'}} type="email" value={email} onChange={handleEmail} />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Password</FormLabel>
					<Input placeholder="password" _placeholder={{color: 'gray.500'}} type="password" />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Phone Number</FormLabel>
					<Input placeholder="Phone Number" _placeholder={{color: 'gray.500'}} type="number" value={phone} onChange={handlePhone} />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Bio</FormLabel>
					<Input placeholder="Bio" _placeholder={{color: 'gray.500'}} size={'lg'} value={bio} onChange={handleBio} />
				</FormControl>
				{error && (
					<Badge colorScheme="red" align={'center'}>
						{`Error: ${error}`}
					</Badge>
				)}
				<Stack spacing={6} direction={['column', 'row']}>
					<Button
						bg={'red.400'}
						color={'white'}
						w="full"
						_hover={{
							bg: 'red.500',
						}}
					>
						Cancel
					</Button>
					<Button
						bg={'blue.400'}
						color={'white'}
						w="full"
						_hover={{
							bg: 'blue.500',
						}}
						onClick={editProfile}
					>
						Submit
					</Button>
				</Stack>
			</Stack>
		</Flex>
	)
}

export default Profile
