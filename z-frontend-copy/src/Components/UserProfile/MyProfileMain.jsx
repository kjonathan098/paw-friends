import React from 'react'
import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center, Text, Textarea} from '@chakra-ui/react'
import {SmallCloseIcon} from '@chakra-ui/icons'
import {useContext} from 'react'
import authContext from '../../Context/AuthContext/AuthContext'
import {useEffect} from 'react'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import {useState} from 'react'
import axios from 'axios'

const MyProfileMain = () => {
	const {userInfo, loading} = useContext(authContext)
	const {data: user, fetchLoading, error, reFetch, setData} = useFetch(`http://localhost:4000/api/user/${userInfo.uid}`)

	const [name, setName] = useState()
	const [surName, setSurname] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [phone, setPhone] = useState()
	const [bio, setBio] = useState()

	useEffect(() => {
		if (!user) return
		setName(user.data.name)
		setSurname(user.data.surName)
		setEmail(user.data.email)
		setPhone(user.data.phone)
		setBio(user.data.bio)
	}, [user])

	const update = async () => {
		const res = await axios.put(`http://localhost:4000/api/user/${userInfo.uid}`, {name, surName, email, password, phone, bio}, {headers: {Authorization: localStorage.getItem('access_token')}})
	}

	if (loading || fetchLoading) return <>Loading....</>
	return (
		<Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
			{user && (
				<Stack spacing={4} w={'full'} maxW={'md'} bg={'white'} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
					<Heading lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
						User Profile Edit
					</Heading>
					<FormControl id="userName">
						<Stack direction={['column', 'row']} spacing={6}>
							<Center>
								<Avatar size="xl" src="https://bit.ly/sage-adebayo">
									<AvatarBadge as={IconButton} size="sm" rounded="full" top="-10px" colorScheme="red" aria-label="remove Image" icon={<SmallCloseIcon />} />
								</Avatar>
							</Center>
							<Center w="full">
								<Button w="full">Change Icon</Button>
							</Center>
						</Stack>
					</FormControl>
					<HStack>
						<FormControl id="userName" isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="UserName"
								_placeholder={{color: 'gray.500'}}
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value)
								}}
							/>
						</FormControl>
						<FormControl id="surName" isRequired>
							<FormLabel>Sur-name</FormLabel>
							<Input
								placeholder="UserName"
								_placeholder={{color: 'gray.500'}}
								type="text"
								value={surName}
								onChange={(e) => {
									setSurname(e.target.value)
								}}
							/>
						</FormControl>
					</HStack>
					<FormControl id="email" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder="your-email@example.com"
							_placeholder={{color: 'gray.500'}}
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder="password"
							_placeholder={{color: 'gray.500'}}
							type="password"
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
					</FormControl>
					<FormControl id="phone" isRequired>
						<FormLabel>Phone</FormLabel>
						<Input
							placeholder="Phone"
							_placeholder={{color: 'gray.500'}}
							type="number"
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value)
							}}
						/>
					</FormControl>
					<FormControl id="Bio">
						<FormLabel>Bio</FormLabel>
						<Textarea
							placeholder="Bio"
							_placeholder={{color: 'gray.500'}}
							type="text"
							value={bio}
							onChange={(e) => {
								setBio(e.target.value)
							}}
						/>
					</FormControl>
					<Stack spacing={6} direction={['column', 'row']}>
						<Button
							bg={'blue.400'}
							color={'white'}
							w="full"
							_hover={{
								bg: 'blue.500',
							}}
							onClick={update}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			)}
		</Flex>
	)
}

export default MyProfileMain
