import express from 'express'
import dotenv from 'dotenv'
import mongoose from'mongoose'

import courseRoutes from './routes/course.route.js'
const app = express()

dotenv.config()

app.use(express.json());
const port = process.env.PORT|| 3000;

const DB_URI = process.env.MONGO_URI

try {
   await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
}
catch (error) {
console.log(`Error connecting to MongoDB: ${error.message}`);
}

//defining routes
app.use("/api/v1/courses", courseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})