import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import { connect } from './lib/database.js'
import userRouter from './Routes/userRouter.js'
import projectRouter from './Routes/projectRouter.js'
import requestLogger from './middlewares/requestLogger.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'


dotenv.config()
const app = express()
connect()

app.use(cors())
app.use(express.json())

app.use(requestLogger)
app.get("/", (req, res) => {
    res.send("Hey is is new app");
  });
  
app.use("/user", userRouter)
app.use("/project", projectRouter)
app.use(globalErrorHandler)


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Up: http://localhost:" + PORT)
})