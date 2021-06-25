/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const TaskModel = require('./models/task');

const app = express();

app.use(express.json());

// connect to MongoDB
mongoose.connect('mongodb+srv://namlnnguyen:1qazQAZ@cluster0.dnem1.mongodb.net/todoApp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// get all current task in database
app.get('/', (req, res) => {
  TaskModel.find()
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get all uncompleted tasks
app.get('/uncompleted', (req, res) => {
  TaskModel.find({ taskCompleted: false })
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// get all completed tasks
app.get('/completed', (req, res) => {
  TaskModel.find({ taskCompleted: true })
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// add new task
app.post('/add', (req, res) => {
  const content = req.body.taskContent;
  const completed = req.body.taskCompleted;

  const newTask = new TaskModel({
    content,
    completed,
  });
  newTask.save()
    .then(() => res.json('Task added to database'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// update content of task
app.post('/updateContent/:id', (req, res) => {
  TaskModel.findById(req.params.id)
    .then((task) => {
      task.taskContent = req.body.content;

      task.save()
        .then(() => res.json('Task content updated'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    });
});

// update status of task
app.post('/updateStatus/:id', (req, res) => {
  TaskModel.findById(req.params.id)
    .then((task) => {
      task.taskCompleted = req.body.completed;

      task.save()
        .then(() => res.json('Task status updated'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    });
});

// clear completed tasks
app.delete('/completed', (req, res) => {
  TaskModel.deleteMany({ taskCompleted: true })
    .then(() => res.json('Task deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001');
});
