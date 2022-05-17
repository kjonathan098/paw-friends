import {authContext} from './AuthContext'

import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const AuthProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [userInfo, setUserInfo] = useState()
	const navigate = useNavigate()

	// Check if token exist
	useEffect(() => {
		setIsLoading(true)
		const access_token = localStorage.getItem('access_token')
		if (access_token) {
			setIsLoggedIn(true)
			const userInfo = localStorage.getItem('user_info')
			setUserInfo(JSON.parse(userInfo))
			setIsLoading(false)
			return navigate('/')
		}
		setIsLoading(false)
		return navigate('/login')
	}, [])

	// LOGIN FUNCTION
	const handdleLogin = (at, rt, userInfo) => {
		setIsLoading(true)
		localStorage.setItem('access_token', at)
		localStorage.setItem('refresh_token', rt)
		localStorage.setItem('user_info', JSON.stringify(userInfo))
		setUserInfo(userInfo)
		setIsLoading(false)
		setIsLoggedIn(true)
		navigate('/')
	}

	// Clear Tokens
	const handdleLogout = () => {
		setIsLoading(true)
		localStorage.clear()
		setIsLoading(false)
		setIsLoggedIn(false)
		navigate('/')
	}

	// Save User Info

	const handdleUserInfo = (user) => {
		setUserInfo(user)
	}

	return <authContext.Provider value={{handdleLogin, isLoading, isLoggedIn, handdleLogout, userInfo, handdleUserInfo}}>{children}</authContext.Provider>
}

export default AuthProvider
