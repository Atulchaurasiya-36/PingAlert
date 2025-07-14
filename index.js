import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import userAuthRouter from "./routes/userAuth.route.js"
import userEventRouter from "./routes/userEvent.route.js"
import userLogRoute from"./routes/userLog.route.js"
import cookieparser from "cookie-parser"
import "./scheduler/scheduler.js";

dotenv.config()
const port=process.env.PORT || 4000
const DB_URI=process.env.MONGO_DB_URI

const app=express()

app.use(express.json());
app.use(cookieparser())

// database connection

try{
  mongoose.connect(DB_URI)
  console.log("database has connected successfully")


}catch(err){
  console.log(err)
  console.log("getting error while connecting database")
}

app.use("/api/userAuth",userAuthRouter)
app.use("/api/userEvent",userEventRouter)
app.use("/api/userLog",userLogRoute)
app.listen(port,()=>{
  console.log(`app is running on port ${port}`)
})