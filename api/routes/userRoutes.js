import express from 'express'
import userController from '../controllers/userController.js'
import { protect } from '../middleware/authorization.js'; // Import your authentication middleware

const router = express.Router()

router.route('/').get(userController.getUsers)
router.route('/manage-task/:userId').get(userController.getUnassignedTasks)
router.route('/manage-task/:userId/assign').post(userController.assignTask)
router.get('/me', protect, userController.getCurrentUser); // Add the /user route here, protected by authentication middleware

export default router