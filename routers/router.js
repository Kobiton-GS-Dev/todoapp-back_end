const express = require('express')
const TaskController = require('../controllers/controller')

const router = express.Router()

router.get('/', TaskController.findAllTasks)
router.post('/', TaskController.addTask)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)
router.delete('/', TaskController.deleteCompleted)

module.exports = router
