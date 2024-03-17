// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRouter from './routes/role.js';
import studentRouter from './routes/studentRoutes.js';
import teacherRouter from './routes/teacherRoutes.js';
import hodRouter from './routes/hodRoutes.js';
import subjectRouter from './routes/subjectsRoutes.js';


const app = express();
dotenv.config();
app.use(express.json());

// Routes
app.use('/api/role', roleRouter);
app.use('/api/auth', studentRouter);
app.use('/api/auth', teacherRouter);
app.use('/api/auth', hodRouter);
app.use('/api/admin', subjectRouter);

// Database Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_LOCAL);
        // await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database!");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Terminate the application on connection error
    }
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
