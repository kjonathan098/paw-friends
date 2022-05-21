import {SmallAddIcon} from '@chakra-ui/icons'
import {Box, BreadcrumbLink, Button, Center, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Radio, RadioGroup, Stack, useBoolean} from '@chakra-ui/react'
import React from 'react'

const AdvanceSearch = ({setFlag}) => {
	return (
		<Box bg={'gray.100'} p={3}>
			<PopoverCloseButton onClick={setFlag.off} />
			<Center>
				<PopoverHeader mb={5} fontWeight={'400'}>
					Advance Search
				</PopoverHeader>
			</Center>
			<Input placeholder="Search Name" bg={'red'} />
			<RadioGroup>
				<Stack direction="row">
					<Radio value="1">Available</Radio>
					<Radio value="2">Fostered</Radio>
					<Radio value="3">Adopted</Radio>
				</Stack>
			</RadioGroup>{' '}
		</Box>
	)
}

export default AdvanceSearch
