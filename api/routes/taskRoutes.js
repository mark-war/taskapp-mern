import express from 'express'
import taskController from '../controllers/taskController.js'
import { protect } from '../middleware/authorization.js';
const router = express.Router()

router.route('/')
    .get(protect, taskController.getTasksForUser)
    .post(protect, taskController.createTaskForUser);
    
router.route('/:id')
    .get(protect, taskController.getTask)
    .put(protect, taskController.updateTask)
    .delete(protect, taskController.deleteTask);

export default router