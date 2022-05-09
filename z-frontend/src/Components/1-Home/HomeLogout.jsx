import {Button} from '@chakra-ui/react'
import React, {useContext} from 'react'
import '../1-Home/Home.css'
import AuthModal from '../2-AuthModal/AuthModal'
import Hero from './Hero'
import {authContext} from '../../Context/AuthContext'

const HomeLogout = () => {
	const isLoggedIn = useContext(authContext)
	return (
		<div className="homeMain">
			<div className="heroimage">
				<Hero />
			</div>
		</div>
	)
}

export default HomeLogout
