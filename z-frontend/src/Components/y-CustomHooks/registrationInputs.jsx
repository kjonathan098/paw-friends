import React from 'react'
import {useState} from 'react'

const useRegistrationInput = () => {
	const [name, setName] = useState()
	const [lastName, setLastName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [rePassword, setRePassword] = useState()
	const [phone, setPhone] = useState()

	const nameInput = (e) => {
		setName(e.target.value)
	}
	const lastNameInput = (e) => {
		setLastName(e.target.value)
	}
	const emailInput = (e) => {
		setEmail(e.target.value)
	}
	const passwordInput = (e) => {
		setPassword(e.target.value)
	}
	const rePasswordInput = (e) => {
		setRePassword(e.target.value)
	}
	const phoneInput = (e) => {
		setPhone(e.target.value)
	}

	return {nameInput, lastNameInput, emailInput, passwordInput, rePasswordInput, phoneInput, lastName, email, name, password, rePassword, phone}
}

export default useRegistrationInput
