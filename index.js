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

app.use(cors({origin:"http//localhost:3000"}))
app.use(express.json())

app.use(requestLogger)

app.get("/", (req, res) => {
    res.send("Hey is my new app");
  });
  
app.use("/user", userRouter)
app.use("/project", projectRouter)

app.use(globalErrorHandler)


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Up: http://localhost:" + port)
})