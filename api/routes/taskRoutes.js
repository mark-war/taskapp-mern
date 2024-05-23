import express from 'express'
import taskController from '../controllers/taskController.js'
const router = express.Router()

router.route('/').get(taskController.getTasks).post(taskController.createTask)
router.route('/:id').get(taskController.getTask).put(taskController.updateTask).delete(taskController.deleteTask)

export default router