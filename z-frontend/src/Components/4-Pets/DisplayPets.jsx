import React from 'react'
import {Tabs, TabList, TabPanels, Tab, TabPanel, Flex} from '@chakra-ui/react'
import SearchPets from '../6-SearchPets/SearchPets'
import MyPets from '../5-MyPets/MyPets'

const DisplayPets = () => {
	return (
		<Flex justifyContent={'center'} h="100vh">
			<Tabs variant="soft-rounded" colorScheme="green" mt={'10'} width={'100%'} justifyContent={'center'}>
				<TabList justifyContent={'center'}>
					<Tab>Search Pets</Tab>
					<Tab>My Pets</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<SearchPets />
					</TabPanel>
					<TabPanel>
						<MyPets />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	)
}

export default DisplayPets
