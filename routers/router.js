const express = require('express');
const TaskController = require('../controllers/controller');

const router = express.Router();

router.get('/', TaskController.findAllTasks);
router.post('/', TaskController.addTask);
router.patch('/content/:id', TaskController.updateTitle);
router.patch('/status/:id', TaskController.updateStatus);
router.delete('/', TaskController.deleteCompleted);
