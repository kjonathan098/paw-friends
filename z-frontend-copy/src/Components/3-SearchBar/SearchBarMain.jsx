import {Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, Tooltip, useBoolean, useDisclosure} from '@chakra-ui/react'
import React, {useContext} from 'react'
import {useState} from 'react'
import useSearch from '../../CustomHooks/SearchHook/useSearch'
import {SearchIcon} from '@chakra-ui/icons'
import AdvanceSearch from './AdvanceSearch'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'
import axios from 'axios'

const SearchBarMain = ({setDisplay}) => {
	const [flag, setFlag] = useBoolean()
	const [isOpen, setIsOpen] = React.useState(false)

	const {fetchQuery} = useContext(petsContext)

	const handleDisplay = async (e) => {
		if (!e.target.value) return fetchQuery({params: {}})
		fetchQuery({params: {type: e.target.value}})
	}

	return (
		<Popover isOpen={flag}>
			<PopoverTrigger>
				<Flex height={10} width={200}>
					<Select placeholder="Display All" onChange={handleDisplay}>
						<option value="1">Display Dogs</option>
						<option value="2">Display Cats</option>
					</Select>
					<Tooltip label="Advance Search">
						<Button onClick={setFlag.toggle}>
							<SearchIcon />
						</Button>
					</Tooltip>
				</Flex>
			</PopoverTrigger>
			<PopoverContent w={{md: `800px`, sm: '300px'}} padding={5}>
				<AdvanceSearch setFlag={setFlag} />
			</PopoverContent>
		</Popover>
	)
}

export default SearchBarMain
