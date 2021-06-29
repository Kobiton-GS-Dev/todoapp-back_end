const TaskModel = require('../models/task')

// find all tasks in the database
module.exports.findAllTasks = async (req, res) => {
  const tasks = await TaskModel.find()
  res.json(tasks)
}

// add new task to database
module.exports.addTask = async (req, res) => {
  const title = req.body.title
  const isCompleted = req.body.isCompleted
  const createdAt = new Date().toLocaleString()
  const updatedAt = ''
  const tasksTobeAdded = new TaskModel({
    title,
    isCompleted,
    createdAt,
    updatedAt,
  })

  const tasks = await tasksTobeAdded.save()
  return res.json(tasks)
}

// update tasks
module.exports.updateTask = async (req, res) => {
  const dataToUpdate = req.body
  dataToUpdate.updatedAt = new Date().toLocaleString()
  await TaskModel.findByIdAndUpdate(
    req.params.id,
    dataToUpdate,
    (err, tasks) => {
      if (err) return res.status(500).json(err)
      return res.json(tasks)
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

// clear completed tasks
module.exports.deleteCompleted = async (req, res) => {
  await TaskModel.deleteMany( {isCompleted: true}, (err, tasks) => {
    if (err) return res.status(500).json(err)
    const message = 'Clear completed tasks'
    return res.json(message)
  })
}
