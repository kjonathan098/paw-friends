import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'

const useFetch = (url, options) => {
	const [data, setData] = useState(null)
	const [fetchLoading, setLoading] = useState()
	const [error, setError] = useState()

	const finalOptions = {
		enabled: true,
		...options,
	}
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
		if (finalOptions.enabled) fetch()
	}, [url])

	const reFetch = async () => {
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
	return {data, fetchLoading, error, reFetch}
}

export default useFetch
