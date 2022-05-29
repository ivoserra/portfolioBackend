import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import { connect } from './lib/database.js'
import userRouter from './Routes/userRouter.js'
import projectRouter from './Routes/projectRouter.js'


dotenv.config()
const app = express()
connect()

app.use(cors())
app.use(express.json())


app.use("/user", userRouter)
app.use("/project", projectRouter)


app.use((error, req, res,next)=>{

    console.log(error)
    res.status(error.status || 500).send({error:error.message || 'Something went wrong'})
})
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("Up: http://localhost:" + PORT)
})