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
const uri = process

app.use(cors())
app.use(express.json())

app.use(function(req, res, next){

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

 //Handle Preflight 
 if (req.method === 'OPTIONS') {
    res.status(200).send();        
 }
 else {
    next();
 }

}); 

// from joel 
//app.use(cors({ origin: "https://github.com/ivoserra/portfolioFullstack", credentials: true }))

app.use(requestLogger)

app.get("/", (req, res) => {
    res.send("Hey this is the web-dev portfolio APi by ivo serra");
  });
  
app.use("/user", userRouter)
app.use("/project", projectRouter)

app.use(globalErrorHandler)


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Up: http://localhost:" + port)
})