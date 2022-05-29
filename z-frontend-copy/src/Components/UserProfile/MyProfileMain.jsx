import React from 'react'
import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center, Text, Textarea, Badge} from '@chakra-ui/react'
import {SmallCloseIcon} from '@chakra-ui/icons'
import {useContext} from 'react'
import authContext from '../../Context/AuthContext/AuthContext'
import {useEffect} from 'react'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import {useState} from 'react'
import axios from 'axios'
import useForm from '../../CustomHooks/apiCalls/useForm'
import ErrorAlert from '../../UI_Kit/ErrorAlert'
import userConfig from '../../Config/User.Config'
import useToastMessage from '../../UI_Kit/ToastMessage'

const MyProfileMainCopy = () => {
	const {userInfo, loading} = useContext(authContext)
	const {data: user, fetchLoading, error, reFetch, setData} = useFetch(`http://localhost:4000/api/user/${userInfo.uid}`)
	const [values, handleChange, setState] = useForm()
	const [updError, setUpdError] = useState()
	const {showToast} = useToastMessage()
	// const [load, setLoad] = useState(true)

	const initialState = {name: '', surName: '', email: '', password: '', phone: '', bio: ''}

	useEffect(() => {
		if (!user) return
		initialState.name = user.data.name
		initialState.surName = user.data.surName
		initialState.email = user.data.email
		initialState.password = user.data.password
		initialState.phone = user.data.phone
		initialState.bio = user.data.bio
		setState(initialState)
	}, [user])

	const update = async () => {
		setUpdError()
		const finalUpdObj = {}

		// if values are not equal to those in DB then populate query obj
		if (values.name !== user.data.name) finalUpdObj.name = values.name
		if (values.surName !== user.data.surName) finalUpdObj.surName = values.surName
		if (values.email !== user.data.email) finalUpdObj.email = values.email
		if (values.phone != user.data.phone) finalUpdObj.phone = values.phone
		if (values.bio !== user.data.bio) finalUpdObj.bio = values.bio

		if (Object.keys(finalUpdObj).length === 0) return setUpdError('No changes were detected')

		const res = await userConfig.updUserProfile(userInfo.uid, finalUpdObj)
		if (res.error) return setUpdError(res.message)

		showToast('Success', 'Profile Updated ')
	}

	if (loading || fetchLoading) return <>Loading....</>
	if (error)
		return (
			<Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
				<ErrorAlert />
			</Flex>
		)

	return (
		<Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
			{values && (
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
							<Input placeholder="UserName" _placeholder={{color: 'gray.500'}} type="text" name="name" value={values.name} onChange={handleChange} />
						</FormControl>
						<FormControl id="surName" isRequired>
							<FormLabel>Sur-name</FormLabel>
							<Input placeholder="UserName" _placeholder={{color: 'gray.500'}} type="text" name="surName" value={values.surName} onChange={handleChange} />
						</FormControl>
					</HStack>
					<FormControl id="email" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input placeholder="your-email@example.com" _placeholder={{color: 'gray.500'}} type="email" name="email" value={values.email} onChange={handleChange} />
					</FormControl>
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<Input placeholder="password" _placeholder={{color: 'gray.500'}} type="password" name="password" onChange={handleChange} />
					</FormControl>
					<FormControl id="phone" isRequired>
						<FormLabel>Phone</FormLabel>
						<Input placeholder="Phone" _placeholder={{color: 'gray.500'}} type="number" name="phone" value={values.phone} onChange={handleChange} />
					</FormControl>
					<FormControl id="Bio">
						<FormLabel>Bio</FormLabel>
						<Textarea placeholder="Bio" _placeholder={{color: 'gray.500'}} type="text" name="bio" value={values.bio} onChange={handleChange} />
					</FormControl>
					{updError && (
						<Badge colorScheme="red" align={'center'}>
							{updError}
						</Badge>
					)}
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

export default MyProfileMainCopy
