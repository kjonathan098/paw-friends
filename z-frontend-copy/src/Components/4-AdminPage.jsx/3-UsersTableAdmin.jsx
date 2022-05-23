import {Center, ButtonGroup, Flex, IconButton, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue, TableContainer, Button, Icon, HStack, Modal, useDisclosure, useBoolean, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react'
import React from 'react'
import {BsBoxArrowUpRight, BsFillTrashFill} from 'react-icons/bs'
import {AiFillEdit, AiTwotoneLock} from 'react-icons/ai'
import useFetch from '../../CustomHooks/apiCalls/useFetch'
import UserModal from './5-UserModal'
import UserTableBody from './4-UserTableBody'

const UserTableAdmin = () => {
	const {data: users, fetchLoading, error, reFetch, setData} = useFetch(`http://localhost:4000/api/user`)
	const {isOpen, onOpen, onClose} = useDisclosure()

	if (fetchLoading) return <>Loading...</>
	if (!users) return <>No users</>

	return (
		<div>
			{users && (
				<TableContainer outline={{border: '2px solid', borderColor: 'purple.500', color: 'purple.500'}}>
					<Center>
						<Table variant="striped" colorScheme="green" width={{md: '900px', sm: 'auto'}} justifyContent={'spaceAround'}>
							<Thead>
								<Tr>
									<Th>Name</Th>
									<Th>Email</Th>
									<Th>Actions</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users.data.map((user) => {
									return <UserTableBody user={user} key={user._id} />
								})}
							</Tbody>
						</Table>
					</Center>{' '}
				</TableContainer>
			)}
		</div>
	)
}
export default UserTableAdmin
