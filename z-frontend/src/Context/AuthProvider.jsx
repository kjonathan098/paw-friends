import {authContext} from './AuthContext'

import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'

const AuthProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const access_token = localStorage.getItem('access_token')
		if (access_token) setIsLoggedIn(true)
		console.log(`user is ${access_token}`)
	}, [])
	return <authContext.Provider value={{isLoggedIn, setIsLoggedIn}}>{children}</authContext.Provider>
}

export default AuthProvider
