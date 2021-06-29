const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const apiRoute = require('./routers/router')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connect to DB successfully.')
  })
  .catch(err => {
    console.error(err)
    console.log('There is some problem with DB Connection. Please try again.')
  })

app.use('/', apiRoute)

app.listen(PORT, err => {
  if (err) console.log('Error in server setup.')

  console.log(`Server is listening on port ${PORT}.`)
})
