import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import {petsContext} from '../../Context/PetsContext'

const useFetch = (url) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState()
	const [error, setError] = useState()
	const {setAllPetsList} = useContext(petsContext)

	useEffect(() => {
		const fetch = async () => {
			setLoading(true)
			try {
				const data = await axios.get(url, {headers: {Authorization: localStorage.getItem('access_token')}})
				setData(data)
			} catch (error) {
				setError(error)
			} finally {
				setLoading(false)
			}
		}
		fetch()
	}, [url])

	const reFetch = async () => {
		setLoading(true)
		try {
			const data = await axios.get(url, {headers: {Authorization: localStorage.getItem('access_token')}})
			setAllPetsList(data)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}
	return {data, loading, error, reFetch}
}

export default useFetch
