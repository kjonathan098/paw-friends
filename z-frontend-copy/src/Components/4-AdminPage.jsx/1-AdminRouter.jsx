import React, {useContext} from 'react'
import authContext from '../../Context/AuthContext/AuthContext'
import {useNavigate} from 'react-router-dom'
import AdminMain from './2-AdminMain'
import {useEffect} from 'react'
import {useState} from 'react'

const AdminRouter = () => {
	const [isAdmin, setIsAdmin] = useState(false)
	const [adminLoading, setLoading] = useState(true)
	const {isLoggedIn, loading} = useContext(authContext)

	const navigate = useNavigate()

	let userPermission = localStorage.getItem('user_info')
	userPermission = JSON.parse(userPermission)

	useEffect(() => {
		if (!isLoggedIn) return
		if (!userPermission?.permissions?.admin) return navigate('/')
		setIsAdmin(true)
		setLoading(false)
	}, [isLoggedIn])

	if (adminLoading) return <>Loading.. </>

	return <AdminMain isAdmin={isAdmin} />
}

export default AdminRouter
