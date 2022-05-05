import {Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Flex, Stack, useColorModeValue, Heading, Text, Box, HStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import axios from 'axios'

import React, {useState} from 'react'

const RegisterForm = ({switchFormContent}) => {
	const [showPassword, setShowPassword] = useState(false)
	const [name, setName] = useState()
	const [lastName, setLastName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [rePassword, setRePassword] = useState()
	const [phone, setPhone] = useState()
	const [error, setError] = useState()
	const [success, setSucces] = useState()

	const handleInput = {
		name: (e) => {
			setName(e.target.value)
		},
		lastName: (e) => {
			setLastName(e.target.value)
		},
		email: (e) => {
			setEmail(e.target.value)
		},
		password: (e) => {
			setPassword(e.target.value)
		},
		rePassword: (e) => {
			setRePassword(e.target.value)
		},
		phone: (e) => {
			setPhone(e.target.value)
		},
	}

	const registerNewUser = async () => {
		setError('')
		if (password !== rePassword) return setError('passwords do not match ')
		try {
			const res = await axios.post('http://localhost:4000/api/auth/register', {
				name,
				surName: lastName,
				email,
				password,
				rePassword,
				phone,
			})
			console.log('registered')
			switchFormContent()
		} catch (error) {
			setError(error.response.data.message)
			console.log(error, 'error')
		}
	}

	return (
		<Flex minH={'75vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Sign up
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>First Name</FormLabel>
									<Input type="text" onChange={handleInput.name} />
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName" isRequired>
									<FormLabel>Last Name</FormLabel>
									<Input type="text" onChange={handleInput.lastName} />
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input type="email" onChange={handleInput.email} />
						</FormControl>
						<FormControl id="email" isRequired>
							<FormLabel>Phone Number</FormLabel>
							<Input type="email" onChange={handleInput.phone} />
						</FormControl>

						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} onChange={handleInput.password} />
								<InputRightElement h={'full'}>
									<Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<FormControl id="rePassword" isRequired>
							<FormLabel> Re-Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} onChange={handleInput.rePassword} />
								<InputRightElement h={'full'}>
									<Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						{error && (
							<Badge colorScheme="red" align={'center'}>
								{error}
							</Badge>
						)}
						{success && (
							<Badge colorScheme="green" align={'center'}>
								{success}
							</Badge>
						)}
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={'green.400'}
								color={'white'}
								_hover={{
									bg: 'green.500',
								}}
								onClick={registerNewUser}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Already a user?{' '}
								<Link color={'blue.400'} onClick={switchFormContent}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default RegisterForm