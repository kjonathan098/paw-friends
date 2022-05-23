import React, {useState} from 'react'

function usePetType() {
	const [petTypeLoading, setPetTypeLoading] = useState(true)
	const [petTypeStringArray, setPetTypeStringArray] = useState([])

	const handleType = (pets) => {
		let petType = []

		for (const pet of pets) {
			switch (pet.type) {
				case 1:
					pet.type = 'Dog'
					petType = [...petType, pet]
					setPetTypeStringArray(petType)
					break
				case 2:
					pet.type = 'Cat'
					petType = [...petType, pet]
					setPetTypeStringArray(petType)
					break
			}
		}
		setPetTypeLoading(false)
	}

	return {petTypeLoading, petTypeStringArray, handleType}
}

export default usePetType
