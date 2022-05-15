import React, {useEffect} from 'react'
import {useState} from 'react'

function usePetStatus(adoptionStatus) {
	const [petStatus, setPetStatus] = useState()

	const [loading, setLoading] = useState(false)
	useEffect(() => {
		console.log('triggered')
		setLoading(true)
		switch (adoptionStatus) {
			case 2:
				setPetStatus({status: 'Adopted', available: false, petAdopted: true})
				adoptionStatus = 'Adopted'
				break
			case 1:
				setPetStatus({status: 'Fostered', available: false, petFostered: true})
				adoptionStatus = 'Fostered'

				break
			case 0:
				setPetStatus({status: 'Available', available: true, petAvailable: true})
				adoptionStatus = 'Available'
				break
		}

		setLoading(false)
	}, [])
	return {petStatus, loading, setPetStatus}
}

export default usePetStatus
