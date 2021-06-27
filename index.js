require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const TaskModel = require('./models/task')

const app = express()

app.use(express.json())

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

app.get('/', async (req, res) => {
  // render all current task in database
  const task = new TaskModel({
    taskContent: 'cleaning house',
    taskCompleted: false
  })

  try {
    await task.save()
    res.send('inserted mock data')
  } catch (err) {
    console.log(err)
  }
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running at http://localhost:3001')
})
