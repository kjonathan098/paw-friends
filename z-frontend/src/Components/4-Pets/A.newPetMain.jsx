import React from 'react'
import {Tabs, TabList, TabPanels, Tab, TabPanel, Flex} from '@chakra-ui/react'
import SearchPets from '../6-SearchPets/SearchPets'
import MyPets from '../5-MyPets/MyPets'
import NewSearchPetsMain from '../6-SearchPets/AnewSearchPetsMain'
import MyFavorites from '../7-MyFavorites/MyFavorites'

const AnewDisplayPets = () => {
	return (
		<Flex justifyContent={'center'} h="100vh">
			<Tabs variant="soft-rounded" colorScheme="green" mt={'10'} width={'100%'} justifyContent={'center'}>
				<TabList justifyContent={'center'}>
					<Tab>Search Pets</Tab>
					<Tab>My Pets</Tab>
					<Tab>My Favorites</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<NewSearchPetsMain />
					</TabPanel>
					<TabPanel>
						<MyPets />
					</TabPanel>
					<TabPanel>
						<MyFavorites />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	)
}

export default AnewDisplayPets
