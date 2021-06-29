const express = require('express')
const multer = require('multer')
const TaskController = require('../controllers/controller')

const router = express.Router()
const upload = multer()

router.get('/', TaskController.findAllTasks)
router.post('/', upload.none(), TaskController.addTask)
router.put('/:id', upload.none(), TaskController.updateTask)
router.delete('/:id', upload.none(), TaskController.deleteTask)

module.exports = router
