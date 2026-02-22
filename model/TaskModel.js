import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task : {
        type : String,
        unique : true
    },
    status : {
        type : String,
        default : "Pending"
    }
})

export const TaskModel = new mongoose.model('Task',TaskSchema)