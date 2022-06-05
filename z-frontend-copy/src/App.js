import './App.css'
import Home from './Components/1-Home/HomeRouter'
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom'
import {Flex} from '@chakra-ui/react'
import AuthProvider from './Context/AuthContext/AuthProvider'
import AuthButton from './UI_Kit/Loggin.Logout.Btn'
import PetsMain from './Components/2-Pets/1-PetsMain'
import AuthRoute from './Components/Z-Auth/AuthRoute'
import AuthModal from './Components/Z-Auth/AuthModal'
import LoginModalProvider from './Context/AuthContext/LoginModalContext/LoginModalProvider'
import PetsProvider from './Context/AuthContext/PetsContext/PetsProvider'
import AdminRouter from './Components/4-AdminPage.jsx/1-AdminRouter'
import logo from './Media/logo2.png'
import MyProfileMain from './Components/5-UserProfile/MyProfileMain'
function App() {
	const nav = useNavigate()
	return (
		<AuthProvider>
			<LoginModalProvider>
				<PetsProvider>
					<div className="App">
						<Flex alignItems={'center'}>
							<div className="menuMain">
								<Flex
									w={50}
									h={50}
									backgroundImage={logo}
									backgroundSize={'cover'}
									backgroundPosition={'center center'}
									onClick={() => {
										nav('/')
									}}
								/>

								<Flex alignItems={'center'} spacing={10} w="500px">
									<NavLink to="/" className="navLkink">
										Home
									</NavLink>
									<NavLink to="/pets" className="navLkink">
										Pets
									</NavLink>
									<AuthButton />
								</Flex>
							</div>
						</Flex>
						<div>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/pets" element={<PetsMain />} />
								<Route
									path="/admin"
									element={
										<AuthRoute>
											<AdminRouter />
										</AuthRoute>
									}
								/>
								<Route
									path="/profile"
									element={
										<AuthRoute>
											<MyProfileMain />
										</AuthRoute>
									}
								/>
							</Routes>
						</div>
					</div>
				</PetsProvider>
				<AuthModal />
			</LoginModalProvider>
		</AuthProvider>
	)
}

export default App
