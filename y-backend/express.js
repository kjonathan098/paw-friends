const petRoute = require('./3-routes/petRoute')
const authRoute = require('./3-routes/authRoute')
const errorMW = require('./6-middlerWares/errorMW')

const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose')
mongoose
	.connect('mongodb://localhost/petAdoption')
	.then(() => console.log('connected to mongoDB/ pet adoption'))
	.catch((e) => console.log('error', e))

app.use('/api/pet', petRoute)
app.use('/api/auth', authRoute)

app.use(errorMW)

app.listen(4000, () => {
	console.log('listening on port 4000...')
})
