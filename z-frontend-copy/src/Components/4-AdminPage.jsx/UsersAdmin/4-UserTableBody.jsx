import {Button, HStack, Icon, IconButton, Td, Tr, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import {BsBoxArrowUpRight, BsFillTrashFill} from 'react-icons/bs'
import {AiFillEdit, AiTwotoneLock} from 'react-icons/ai'
import UserModal from './5-UserModal'

const UserTableBody = ({user}) => {
	const {isOpen, onOpen, onClose} = useDisclosure()

	return (
		<>
			<Tr>
				<Td>
					{user.name} {''} {user.surName}
				</Td>
				<Td>{user.email}</Td>
				<Td>
					<HStack>
						<Button size="xs" variant="solid" leftIcon={<Icon as={AiTwotoneLock} />} colorScheme="purple" onClick={onOpen}>
							View Profile
						</Button>
						<IconButton size="xs" colorScheme="red" variant="solid" icon={<BsFillTrashFill />} />
					</HStack>
				</Td>
			</Tr>
			<UserModal user={user} isOpen={isOpen} onClose={onClose} />
		</>
	)
}

export default UserTableBody
