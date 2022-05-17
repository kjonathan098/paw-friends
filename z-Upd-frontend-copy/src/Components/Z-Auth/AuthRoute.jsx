import React, {useEffect} from 'react'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import authContext from '../../Context/AuthContext/AuthContext'

const AuthRoute = ({children}) => {
	const {isLoggedIn, loading} = useContext(authContext)

	const navigate = useNavigate()

	useEffect(() => {
		const log = true

		if (loading) return <>Loading...</>
		if (!isLoggedIn) return navigate('/')
	}, [])

	return children
}

export default AuthRoute
