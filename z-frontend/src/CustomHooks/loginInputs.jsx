import React from 'react'
import {useState} from 'react'

const useLoginInput = () => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const handdleEmail = (e) => {
		setEmail(e.target.value)
	}
	const handdlePassword = (e) => {
		setPassword(e.target.value)
	}

	return {handdleEmail, handdlePassword, password, email}
}

export default useLoginInput
