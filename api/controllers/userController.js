import asyncHandler from 'express-async-handler'
import Task from '../models/taskModel.js'
import User from '../models/userModel.js'

const getUsers = asyncHandler(async (req, res) => {
    User.find()
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
})

const getUnassignedTasks = asyncHandler(async (req, res) => {
    Task.find()
        .then(result => {
            res.send(result.filter((task) => { return task.user === undefined}))
        })
        .catch(err => {
            res.send(err)
        })
})

const assignTask = asyncHandler(async (req, res) => {
    const { userId, taskId } = req.body;
    console.log('API Assigning Task:', taskId, 'to User:', userId); // Log to verify taskId and userId

    // Validate ObjectId format
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    if (!isValidObjectId(userId) || !isValidObjectId(taskId)) {
        console.error('Invalid ObjectId format');
        return res.status(400).json({ message: 'Invalid ObjectId format' });
    }

    try {
        // Use Promise.all to fetch both user and task concurrently
        const [user, task] = await Promise.all([
            User.findById(userId),
            Task.findById(taskId)
        ]);

        if (!user || !task) {
            return res.status(404).json({ message: 'User or Task not found' });
        }

        console.log('FIND Assigning Task:', task.desc, 'to User:', user.name); // Log to verify taskId and userId

        // Assign the user to the task and save
        task.user = user;
        await task.save();

        res.json({ message: 'Task assigned successfully' });
    } catch (err) {
        console.error('Error assigning task:', err);
        res.status(500).json({ message: 'Error assigning task' });
    }
});

 
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default { getUsers, assignTask, getCurrentUser, getUnassignedTasks }