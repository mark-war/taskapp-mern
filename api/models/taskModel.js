import mongoose, { model } from "mongoose";

const taskSchema = mongoose.Schema({
    desc: {
        type: String,
        required: [true, 'Please add a description of your task.']
    },
    completed: {
        type: Boolean,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model('Task', taskSchema)