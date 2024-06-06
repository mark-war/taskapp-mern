import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js'
import dbConnection from './config/dbConnection.js'
import taskRoutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'

dbConnection() 
const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler)

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });