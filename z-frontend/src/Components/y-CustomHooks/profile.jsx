import React, {useEffect} from 'react'
import {useContext, useState} from 'react'
import {authContext} from '../../Context/AuthContext'
import axios from 'axios'

const useProfileHook = () => {
	const {userInfo} = useContext(authContext)

	const [email, setEmail] = useState()
	const [name, setName] = useState()
	const [phone, setPhone] = useState()
	const [bio, setBio] = useState()

	useEffect(() => {
		console.log('helloooo')
		const fetchUser = async () => {
			const user = await axios.get(`http://localhost:4000/api/user/${userInfo.uid}`)
			setEmail(user.data.email)
			setName(user.data.name)
			setPhone(user.data.phone)
			setBio(user.data.bio)
		}
		fetchUser()
	}, [])

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}
	const handleName = (e) => {
		setName(e.target.value)
	}
	const handlePhone = (e) => {
		setPhone(e.target.value)
	}
	const handleBio = (e) => {
		setBio(e.target.value)
	}

	return {email, handleEmail, name, handleName, phone, handlePhone, handleBio, bio}
}
export default useProfileHook
