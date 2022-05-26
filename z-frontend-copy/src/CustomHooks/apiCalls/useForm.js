import React, {useState} from 'react'

function useForm() {
	const [state, setState] = useState({})

	const handleChange = (e) => {
		e.persist()
		setState((state) => ({...state, [e.target.name]: e.target.value}))
	}
	return [state, handleChange, setState]
}

export default useForm
