import {Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue, Badge} from '@chakra-ui/react'
import {useState} from 'react'
import axios from 'axios'
import {authContext} from '../../Context/AuthContext'
import {useContext} from 'react'
import {loginModalContext} from '../../Context/LoginModalContext'
import {useNavigate} from 'react-router-dom'
import useLoginInput from '../y-CustomHooks/loginInputs'
import {userPetsContext} from '../../Context/UserPetsContext'

export default function LoginForm({switchFormContent}) {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const {getUserPets} = useContext(userPetsContext)

	// auth context
	const isLoggedIn = useContext(authContext)
	const context = useContext(userPetsContext)
	const loginModalSwitcher = useContext(loginModalContext)
	const navigate = useNavigate('/')

	const {handdleEmail, handdlePassword, password, email} = useLoginInput()

	const handleLogin = async () => {
		try {
			setLoading(true)
			const res = await axios.post('http://localhost:4000/api/auth/login', {email, password})

			console.log(res)

			//extract info and set them in local
			const access_token = res.data.acces_token
			const refresh_token = res.data.refresh_token
			const userInfo = {name: res.data.name, surName: res.data.surName, uid: res.data.uid}

			// save in local storage
			isLoggedIn.handdleLogin(access_token, refresh_token, userInfo)

			// Fetch User's pets and set them in global context

			// close modal
			loginModalSwitcher.onClose(true)

			getUserPets(res.data.uid)

			setLoading(false)
			navigate('/')
		} catch (error) {
			// setError(error.response.data.message)
			setLoading(false)
			setError('Error')
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
							<Input type="email" onChange={handdleEmail} />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" onChange={handdlePassword} />
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
