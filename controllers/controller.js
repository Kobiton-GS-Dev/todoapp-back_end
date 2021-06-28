const TaskModel = require('../models/task');

// find all tasks in the database
module.exports.findAllTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.json(tasks);
}

// add new task to database
module.exports.addTask = async (req, res) => {
  const taskToBeAdded = new TaskModel(req.body);
  const tasks = await taskToBeAdded.save();
  res.json(tasks);
}

// update title of the tasks
module.exports.updateTitle = async (req, res) => {
  await TaskModel.findById(req.params.id, (err, tasks) => {
    if (err) {
      return res.status(500).json(err);
    };
    tasks.title = req.body.title;
    tasks.save();
    return res.json(tasks);
  });
}

// update status of the tasks
module.exports.updateStatus = async (req, res) => {
  await TaskModel.findById(req.params.id, (err, tasks) => {
    if (err) {
      return res.status(500).json(err);
    };
    tasks.title = req.body.isCompleted;
    tasks.save();
    return res.json(tasks);
  });
}

// delete completed tasks
module.exports.deleteCompleted = async (req, res) => {
  await TaskModel.deleteMany({ isCompleted: true }, (err, tasks) => {
    if (err) {
      return res.status(500).json(err);
    };
    const message = 'clear all completed tasks';
    return res.json(message);
  });
}
