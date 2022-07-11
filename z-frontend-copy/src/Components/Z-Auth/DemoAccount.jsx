import {Button} from '@chakra-ui/react'
import React from 'react'

const DemoAccount = ({handleLogin, loading}) => {
	return (
		<Button
			bg={'green.900'}
			color={'white'}
			_hover={{
				bg: 'green.800',
			}}
			onClick={() => {
				const demo = true
				handleLogin(demo)
			}}
			isLoading={loading}
		>
			Demo Account{' '}
		</Button>
	)
}

export default DemoAccount
