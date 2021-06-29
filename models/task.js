const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: 'string',
  },
  isCompleted: {
    type: 'boolean',
  },
  createdAt: {
    type: 'string',
  },
  updatedAt: {
    type: 'string',
  }
})

const tasks = mongoose.model('task', taskSchema)
module.exports = tasks
