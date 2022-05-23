import React, {useContext} from 'react'
import authContext from '../../Context/AuthContext/AuthContext'
import {useNavigate} from 'react-router-dom'
import AdminMain from './2-AdminMain'

const AdminRouter = () => {
	const {isLoggedIn, loading, test} = useContext(authContext)
	const navigate = useNavigate()

	if (loading) return <>Loading ...</>
	if (!isLoggedIn) return navigate('/')
	if (isLoggedIn) return <AdminMain />
}

export default AdminRouter
