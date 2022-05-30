import React, {useState} from 'react'

function usePetType() {
	const [petTypeLoading, setPetTypeLoading] = useState(true)
	const [petTypeStringArray, setPetTypeStringArray] = useState([])

	const handleType = (pets) => {
		console.log('afafafa')
		let petType = []

		for (const pet of pets) {
			console.log('checking pet type', pet)
			switch (pet.type) {
				case 1:
					console.log('Im a dog')
					pet.typeDisplay = 'Dog'
					petType = [...petType, pet]
					setPetTypeStringArray(petType)
					break
				case 2:
					console.log('Im a cat')
					pet.typeDisplay = 'Cat'
					petType = [...petType, pet]
					setPetTypeStringArray(petType)
					break
				default:
					console.log('Im a dragon')
					pet.typeDisplay = 'Dragon'
					petType = [...petType, pet]
					setPetTypeStringArray(petType)
			}
		}
		setPetTypeLoading(false)
	}

	return {petTypeLoading, petTypeStringArray, handleType}
}

export default usePetType
