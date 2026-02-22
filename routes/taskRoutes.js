import express from 'express';
import { TaskModel } from '../model/TaskModel.js';

export const router = express.Router();

// Create operation

router.post('/api/create',async (req, res)=>{

    try{

        const {task} = req.body;

        if (!task){

            console.log("Missing task in request body");
            res.status(400).json({
                message : "Bad Request",
                error : "Missing task in request body"
            });

            return;

        }

        const createdTask = new TaskModel({
            task
        })
        await createdTask.save();

        console.log("Successfully saved task to database");
        res.status(201).json({
            message : "Created",
            data : createdTask
        });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });

    }

})

// Read operation

router.get('/api/display-tasks',async (req, res)=>{

    try{

        const tasks = await TaskModel.find({},{_id : 1, task : 1, status : 1});

        console.log("Successfully read all tasks from database");
        res.status(200).json({
            message : "OK",
            data : tasks.map(task => ({
                id : task._id,
                task : task.task,
                status : task.status
            }))
        });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });

    }

})

// Update operation

router.patch('/api/update-task/:id',async (req, res)=>{

    try{

        const {id} = req.params;

        if (!id) {

            console.log("Missing id parameter");
            res.status(400).json({
                message : "Bad Request",
                error : "Missing id parameter"
            });

        }

        const doc = await TaskModel.findById(id);

        if (!doc){

            console.log("Couldn't find specified doc")
            res.status(404).json({
                message : "Not Found",
                error : "Couldn't find specified doc"
            });

        }

        const oldStatus = doc.status;
        const newStatus = (oldStatus == "Pending") ? "Completed" : "Pending";

        const updatedTask = await TaskModel.findByIdAndUpdate(id, {status : newStatus}, {new : true});

        console.log("Successfully updated task in database");
        res.status(201).json({
            message : "Created",
            data : {
                id : updatedTask._id,
                task : updatedTask.task,
                status : updatedTask.status
            }
        });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });

    }

})

// Delete operation

router.delete('/api/delete-task/:id',async (req, res)=>{

    try{

        const {id} = req.params;

        if (!id) {

            console.log("Missing id parameter");
            res.status(400).json({
                message : "Bad Request",
                error : "Missing id parameter"
            });

        }

        const doc = await TaskModel.findById(id);

        if (!doc){

            console.log("Couldn't find specified doc")
            res.status(404).json({
                message : "Not Found",
                error : "Couldn't find specified doc"
            });

        }

        await TaskModel.findByIdAndDelete(id);

        console.log("Successfully deleted task in database");
        res.status(201).json({
            message : "Deleted",
            data : {}
        });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        });

    }

})


