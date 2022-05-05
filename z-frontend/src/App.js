import './App.css'
import {NavLink, Route, Routes} from 'react-router-dom'
import Home from './Components/1-Home/Home'
import LoginModalProvider from '../src/Context/LoginModalProvider'
import {loginModalContext} from './Context/LoginModalContext'
import {useContext} from 'react'
import LoginButton from './Components/z-Helpers/LoginButton'
import AuthProvider from './Context/AuthProvider'
import {authContext} from './Context/AuthContext'

function App() {
	const modalSwitcher = useContext(loginModalContext)
	const isLoggedIn = useContext(authContext)
	return (
		<LoginModalProvider>
			<AuthProvider>
				<div className="App">
					<div className="navBar">
						<div className="menuMain">
							<div>Logo</div>
							<div>
								<NavLink to="/" className="navLkink">
									Home
								</NavLink>
								<NavLink to="/pets" className="navLkink">
									Pets
								</NavLink>
								<LoginButton />
							</div>
						</div>
					</div>
					<div>
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</div>
				</div>
			</AuthProvider>
		</LoginModalProvider>
	)
}

export default App
