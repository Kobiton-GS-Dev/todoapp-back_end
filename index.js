require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const TaskModel = require('./models/task')

const app = express()

app.use(express.json())

// connect to MongoDB
mongoose.connect(
  'mongodb+srv://namlnnguyen:1qazQAZ@cluster0.dnem1.mongodb.net/todoApp?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
)

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

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001')
})
