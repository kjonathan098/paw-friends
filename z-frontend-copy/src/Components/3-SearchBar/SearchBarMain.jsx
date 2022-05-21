import {Button, Flex, Popover, Select, Tooltip, useBoolean} from '@chakra-ui/react'
import React from 'react'
import {useState} from 'react'
import useSearch from '../../CustomHooks/SearchHook/useSearch'
import {SearchIcon} from '@chakra-ui/icons'
import AdvanceSearch from './AdvanceSearch'

const SearchBarMain = ({setDisplay}) => {
	const [flag, setFlag] = useBoolean()

	const handleDisplay = (e) => {
		setDisplay(parseInt(e.target.value))
	}

	return (
		<Popover isOpen={flag}>
			<Flex height={10} width={200}>
				<Select placeholder="Display All" onChange={handleDisplay}>
					<option value="1">Display Dogs</option>
					<option value="2">Display Cats</option>
				</Select>
				<Tooltip label="Advance Search">
					<Button>
						<SearchIcon />
					</Button>
				</Tooltip>
			</Flex>
		</Popover>
	)
}

export default SearchBarMain
