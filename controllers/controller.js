const TaskModel = require('../models/task');

// find all tasks in the database
module.exports.findAllTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
}

// add new task to database
module.exports.addTask = async (req, res) => {
  const tasks = await TaskModel.create(req.body)
  res.json(tasks);
}

// update tasks
module.exports.updateTask = async (req, res) => {
  await TaskModel.findByIdAndUpdate(req.params.id, req.body, (err, tasks) => {
    if (err) return res.status(500).json(err);
    return res.json(tasks);
  });
}

// delete tasks
module.exports.deleteTask = async (req, res) => {
  await TaskModel.findByIdAndRemove(req.params.id, (err, tasks) => {
    if (err) return res.status(500).json(err);
    const message = 'Deleted task'
    return res.json(message);
  })
}
