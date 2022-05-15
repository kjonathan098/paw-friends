import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center} from '@chakra-ui/react'
import {SmallCloseIcon} from '@chakra-ui/icons'
import {useContext} from 'react'
import {authContext} from '../../Context/AuthContext'

export default function EditProfile() {
	const {userInfo} = useContext(authContext)
	return (
		<Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} boxShadow={'lg'} p={6} my={12}>
				<Heading lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
					{userInfo.name}
				</Heading>
				<FormControl id="userName">
					<FormLabel>User name</FormLabel>
					<Input placeholder="UserName" _placeholder={{color: 'gray.500'}} type="text" />
				</FormControl>
				<FormControl id="email">
					<FormLabel>Email address</FormLabel>
					<Input placeholder="your-email@example.com" _placeholder={{color: 'gray.500'}} type="email" />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Password</FormLabel>
					<Input placeholder="password" _placeholder={{color: 'gray.500'}} type="password" />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Phone Number</FormLabel>
					<Input placeholder="Phone Number" _placeholder={{color: 'gray.500'}} type="number" />
				</FormControl>
				<FormControl id="password">
					<FormLabel>Bio</FormLabel>
					<Input placeholder="Bio" _placeholder={{color: 'gray.500'}} size={'lg'} />
				</FormControl>
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
					>
						Submit
					</Button>
				</Stack>
			</Stack>
		</Flex>
	)
}
