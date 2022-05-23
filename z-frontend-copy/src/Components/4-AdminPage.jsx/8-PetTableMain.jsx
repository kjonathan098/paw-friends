import React, {useContext, useEffect} from 'react'
import petsContext from '../../Context/AuthContext/PetsContext/PetsContex'

const PetTableMain = () => {
	const {allPets, fetchLoading} = useContext(petsContext)

	useEffect(() => {
		console.log(fetchLoading)
	}, [])

	return <div>Petssssss</div>
}

export default PetTableMain
