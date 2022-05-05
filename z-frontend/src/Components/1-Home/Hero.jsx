import {Stack, Flex, Button, Text, VStack, useBreakpointValue} from '@chakra-ui/react'
import hero from '../z-Images/hero3.jpeg'

export default function Hero() {
	return (
		<Flex w={'full'} h={'100vh'} backgroundImage={hero} backgroundSize={'cover'} backgroundPosition={'center center'}>
			<VStack w={'full'} justify={'center'} px={useBreakpointValue({base: 4, md: 8})} bgGradient={'linear(to-r, blackAlpha.400, transparent)'}>
				<Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
					<Text color={'white'} fontWeight={900} lineHeight={1.2} fontSize={useBreakpointValue({base: '5xl', md: '7xl'})}>
						Find youre perfect paw-fwiend
					</Text>
					<Stack direction={'row'}>
						<Button bg={'green.400'} rounded={'full'} color={'white'} _hover={{bg: 'green.500'}}>
							Search Pets
						</Button>
						<Button bg={'whiteAlpha.300'} rounded={'full'} color={'white'} _hover={{bg: 'whiteAlpha.500'}}>
							Show me more
						</Button>
					</Stack>
				</Stack>
			</VStack>
		</Flex>
	)
}
