import {Flex, Box, FormControl, FormLabel, Input, Stack, Link, Button, Heading, Text, useColorModeValue, Badge, useToast} from '@chakra-ui/react'
import React, {useContext} from 'react'
import {useState} from 'react'
import userConfig from '../../Config/User.Config'
import authContext from '../../Context/AuthContext/AuthContext'
import loginModalContext from '../../Context/AuthContext/LoginModalContext/LoginModalContext'
import useForm from '../../CustomHooks/apiCalls/useForm'
import toastMessage from '../../UI_Kit/ToastMessage'

const LoginForm = ({setFormContent}) => {
	const {setUserInfo, setIsLoggedIn} = useContext(authContext)
	const {onClose} = useContext(loginModalContext)
	const [values, handleChange] = useForm()
	const [error, setError] = useState()
	const [loading, setLoading] = useState()
	const toast = useToast()

	const handleLogin = async () => {
		setLoading(true)
		const userInfo = await userConfig.loginUser(values)
		if (userInfo.error) return setError(userInfo.message)
		setUserInfo(userInfo)
		setIsLoggedIn(true)
		onClose()
		toast({
			title: 'Success',
			description: "You've logged in",
			status: 'success',
			duration: 5000,
			isClosable: true,
		})
		setLoading(false)
	}
	return (
		<Flex minH={'75vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
					</Text>
				</Stack>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input type="email" name="email" onChange={handleChange} />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" name="password" onChange={handleChange} />
						</FormControl>
						{error && (
							<Badge colorScheme="red" align={'center'}>
								{error}
							</Badge>
						)}
						<Stack spacing={10}>
							<Button
								bg={'green.400'}
								color={'white'}
								_hover={{
									bg: 'green.500',
								}}
								onClick={handleLogin}
								isLoading={loading}
							>
								Sign in
							</Button>
						</Stack>
						<Stack direction={{base: 'column', sm: 'row'}} align={'start'} justify={'space-between'}>
							<Text align={'center'}>
								New User?
								<Link
									color={'blue.400'}
									onClick={() => {
										setFormContent(false)
									}}
								>
									Register Here
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default LoginForm