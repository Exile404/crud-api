import  express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import userRoute from "./routes/user-route.js";
mongoose.set('strictQuery',true);

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoute);

dotenv.config()
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB!!")
    }
    catch(error){
        console.log(error)
    }
}


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).send(errorMessage);
})

app.listen(8800,()=>{
    connect()
    console.log("Backend Server is running!")
})