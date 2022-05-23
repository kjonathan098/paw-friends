import {SmallAddIcon} from '@chakra-ui/icons'
import {Box, BreadcrumbLink, Button, Center, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Radio, RadioGroup, Stack, useBoolean} from '@chakra-ui/react'
import React, {useContext} from 'react'
import {useState} from 'react'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'

const AdvanceSearch = ({setFlag}) => {
	const [query, setQuery] = useState([])
	const [petType, setPetType] = useState()

	const {fetchQuery} = useContext(petsContext)

	const handleQuery = (e) => {
		fetchQuery({params: petType})
	}
	return (
		<Box p={3}>
			<PopoverCloseButton onClick={setFlag.off} />
			<Center>
				<PopoverHeader mb={5} fontWeight={'400'}>
					Advance Search
				</PopoverHeader>
			</Center>
			<RadioGroup>
				Search On
				<Stack
					direction="row"
					onChange={(e) => {
						setPetType({type: e.target.value})
					}}
				>
					<Radio value="">All</Radio>
					<Radio value="1">Dogs</Radio>
					<Radio value="2">Cats</Radio>
				</Stack>
			</RadioGroup>{' '}
			{/* <Input placeholder="Search Name" />
			<RadioGroup>
				<Stack direction="row">
					<Radio value="1">Available</Radio>
					<Radio value="2">Fostered</Radio>
					<Radio value="3">Adopted</Radio>
				</Stack>
			</RadioGroup>{' '} */}
			<Button onClick={handleQuery}>Search</Button>
		</Box>
	)
}

export default AdvanceSearch
