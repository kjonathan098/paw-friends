import React, {useEffect} from 'react'
import {useState} from 'react'

function useTRYOUTPetStatus(status) {
	const [petStatus, setPetStatus] = useState()

	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		switch (status) {
			case 2:
				setPetStatus({status: 'Adopted', available: false, petAdopted: true})
				break
			case 1:
				setPetStatus({status: 'Fostered', available: false, petFostered: true})

				break
			case 0:
				setPetStatus({status: 'Available', available: true, petAvailable: true})
				break
		}

		setLoading(false)
	}, [])
	return {petStatus, loading, setPetStatus}
}

export default useTRYOUTPetStatus
