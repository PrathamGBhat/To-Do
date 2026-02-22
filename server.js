import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { router } from './routes/taskRoutes.js';

// Setting up server

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
})
app.use(express.json());
app.use(express.static('./frontend/public'));
app.use(router);

// Connecting database

mongoose.connect(process.env.DATABASE_CONNECTION_URL)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch(err => {
        console.error(err.message || "Error");
        process.exit(1);
    })

// Endpoint to serve static frontend page

router.get('/', (req,res) => {

  res.sendFile('index.html', {root: 'public'});

});