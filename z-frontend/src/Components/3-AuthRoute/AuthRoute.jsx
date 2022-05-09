import React from 'react'
import {useEffect} from 'react'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {authContext} from '../../Context/AuthContext'

const AuthRoute = ({children}) => {
	const authData = useContext(authContext)
	const navigate = useNavigate()

	if (authData.isLoading) return <>Loading...</>
	if (authData.isLoggedIn) return children
	if (!authData.isLoggedIn) navigate('/login')
}

export default AuthRoute
