import React, {useContext, useState} from 'react'
import {Button} from '@chakra-ui/react'

const ViewMoreButton = ({onOpen}) => {
	return (
		<Button bg={'green.400'} rounded={'full'} color={'white'} _hover={{bg: 'green.500'}} boxShadow="xl" mt={'2'} onClick={onOpen}>
			View More
		</Button>
	)
}

export default ViewMoreButton
