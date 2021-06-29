const TaskModel = require('../models/task')

// find all tasks in the database
module.exports.findAllTasks = async (req, res) => {
  const tasks = await TaskModel.find()
  res.json(tasks)
}

// add new task to database
module.exports.addTask = async (req, res) => {
  const { title, isCompleted } = req.body
  const createdAt = new Date().toLocaleString()
  const updatedAt = new Date().toLocaleString()
  const task = await TaskModel.create({
    title,
    isCompleted,
    createdAt,
    updatedAt
  })
  return res.json(task)
}

// update tasks
module.exports.updateTask = async (req, res) => {
  const { id } = req.body
  const dataToUpdate = {
    ...req.body,
    updatedAt: new Date().toLocaleString()
  }
  await TaskModel.findByIdAndUpdate(id, dataToUpdate, (err, task) => {
    if (err) return res.status(500).json(err)
    return res.json(task)
  })
}

// delete tasks
module.exports.deleteTask = async (req, res) => {
  await TaskModel.findByIdAndRemove(req.params.id, (err, tasks) => {
    if (err) return res.status(500).json(err)
    const message = 'Deleted task'
    return res.json(message)
  })
}
