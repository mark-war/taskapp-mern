import asyncHandler from 'express-async-handler'
import taskModel from '../models/taskModel.js'

const today = new Date().toISOString().slice(0, 10)

const getTasksForUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    taskModel.find({ user: userId })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
})

//@desc Create Task
//@route POST /api/tasks
//@access public
const createTask = asyncHandler(async (req, res) => {
    const {desc} = req.body

    if(!desc) {
        res.status(400).json({error: 'Description is mandatory.'})
        return
    }

    taskModel.create({
        desc, 
        completed: false, 
        createdOn: today
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

const createTaskForUser = asyncHandler(async (req, res) => {
    const {desc} = req.body
    const userId = req.user._id

    if(!desc) {
        res.status(400).json({error: 'Description is mandatory.'})
        return
    }

    taskModel.create({
        desc, 
        completed: false, 
        createdOn: today,
        user: userId
    }).then(result => {
        res.status(201).send(result)
    }).catch(err => {
        res.status(500).send(err)
    })
})

//@desc Get Task
//@route GET /api/tasks/:id
//@access public
const getTask = asyncHandler(async (req, res) => {
    taskModel.findById(req.params.id)
    .then(result => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'Task not found' });
        }
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

//@desc Update Task
//@route PUT /api/tasks/:id
//@access public
const updateTask = asyncHandler(async (req, res) => {
    taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'Task not found' });
        }
    })
    .catch(err => {
        res.status(500).send(err);
    }); 
});

const updateTaskForUser = asyncHandler(async (req, res) => {
    // Extract task updates from request body
    const taskUpdates = req.body;

    // Check if user assignment is present in the request
    if (taskUpdates.user) {
        // Ensure the user ID is valid (you might want to add more validation)
        if (!mongoose.Types.ObjectId.isValid(taskUpdates.user)) {
            return res.status(400).send({ message: 'Invalid user ID' });
        }
    }

    taskModel.findByIdAndUpdate(req.params.id, taskUpdates, { new: true })
    .then(result => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'Task not found' });
        }
    })
    .catch(err => {
        res.status(500).send(err);
    }); 
});

//@desc Delete Task
//@route DELETE /api/tasks/:id
//@access public
const deleteTask = asyncHandler(async (req, res) => {
    taskModel.findByIdAndDelete(req.params.id)
    .then(result => {
        if (result) {
            res.send({ message: 'Task deleted successfully' });
        } else {
            res.status(404).send({ message: 'Task not found' });
        }
    })
    .catch(err => {
        res.status(500).send(err);
    }); 
});

export default { getTasksForUser, createTask, createTaskForUser, getTask, updateTask, updateTaskForUser, deleteTask }