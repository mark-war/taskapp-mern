import asyncHandler from 'express-async-handler'
import taskModel from '../models/taskModel.js'

const today = new Date().toISOString().slice(0, 10)

//@desc Get all tasks
//@route GET /api/tasks
//@access public
const getTasks = asyncHandler(async (req, res) => {
    taskModel.find()
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
    console.log(req.body)
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

export default {getTasks, createTask, getTask, updateTask, deleteTask}