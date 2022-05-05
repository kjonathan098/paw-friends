import {Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue, Badge} from '@chakra-ui/react'
import {useState} from 'react'
import axios from 'axios'

export default function LoginForm({switchFormContent}) {
	const [error, setError] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const handleInput = {
		email: (e) => {
			setEmail(e.target.value)
		},
		password: (e) => {
			setPassword(e.target.value)
		},
	}

	const handleLogin = async () => {
		try {
			const res = await axios.post('http://localhost:4000/api/auth/login', {
				email: email,
				password: password,
			})

			// Keep doing auth
			console.log(res)
		} catch (error) {
			setError(error.response.data.message)
			console.log(error)
		}
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
							<Input type="email" onChange={handleInput.email} />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" onChange={handleInput.password} />
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
							>
								Sign in
							</Button>
						</Stack>
						<Stack direction={{base: 'column', sm: 'row'}} align={'start'} justify={'space-between'}>
							<Text align={'center'}>
								New User?{' '}
								<Link color={'blue.400'} onClick={switchFormContent}>
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