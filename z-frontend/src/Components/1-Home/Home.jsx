import {Button} from '@chakra-ui/react'
import React, {useContext} from 'react'
import '../1-Home/Home.css'
import AuthModal from '../2-AuthModal/AuthModal'
import Hero from './Hero'
import {authContext} from '../../Context/AuthContext'

const Home = () => {
	const isLoggedIn = useContext(authContext)
	console.log(isLoggedIn.isLoggedIn, 'is logged in?')
	return (
		<div className="homeMain">
			<div className="heroimage">
				<Hero />
				<AuthModal />
			</div>
		</div>
	)
}

export default Home
