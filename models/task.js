const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: true
  },
  isCompleted: {
    type: 'boolean',
    required: true
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
