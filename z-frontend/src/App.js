import './App.css'
import {NavLink, Route, Routes} from 'react-router-dom'
import HomeLogout from './Components/1-Home/HomeLogout'
import LoginModalProvider from '../src/Context/LoginModalProvider'
import {loginModalContext} from './Context/LoginModalContext'
import {useContext, useEffect, useState} from 'react'
import AuthProvider from './Context/AuthProvider'
import {authContext} from './Context/AuthContext'
import HomeLogin from './Components/1-Home/HomeLogin'
import AuthModal from './Components/2-AuthModal/AuthModal'
import AuthRoute from './Components/3-AuthRoute/AuthRoute'
import NavLoggedIn from './Components/NavBarLoggedIn/navLoggedIn'
import {Flex} from '@chakra-ui/react'
import SearchPets from './Components/4-SearchPets/SearchPets'
import MyPets from './Components/5-MyPets/MyPets'
import Profile from './Components/6-Profile/Profile'
import LoginButton from './UI_Kit/LoginButton'

function App() {
	const [userLoggedIn, setUserLoggedIn] = useState()
	const modalSwitcher = useContext(loginModalContext)

	return (
		<AuthProvider>
			<LoginModalProvider>
				<div className="App">
					<Flex alignItems={'center'}>
						<div className="menuMain">
							<div>Logo</div>
							<Flex alignItems={'center'} spacing={10} w="500px">
								<NavLink to="/" className="navLkink">
									Home
								</NavLink>
								<NavLink to="/pets" className="navLkink">
									Pets
								</NavLink>
								<LoginButton />
								<NavLoggedIn />
							</Flex>
						</div>
					</Flex>
					<div>
						<Routes>
							<Route
								path="/"
								element={
									<AuthRoute>
										<HomeLogin />
									</AuthRoute>
								}
							/>
							<Route path="/login" element={<HomeLogout />} />
							<Route path="/pets" element={<SearchPets />} />
							<Route path="/myPets" element={<MyPets />} />
							<Route
								path="/profile"
								element={
									<AuthRoute>
										<Profile />
									</AuthRoute>
								}
							/>
						</Routes>
					</div>
				</div>
				<AuthModal />
			</LoginModalProvider>
		</AuthProvider>
	)
}

export default App
