import express from 'express'
import User from '../models/User.js'
import checkRegistration from '../middlewares/checkRegistration.js'
import checkUser from '../middlewares/checkUser.js'
import requestValidator from '../middlewares/requestValidator.js'
import { userValidator, registerValidator } from '../validators/userValidator.js'




const userRouter = express.Router()


userRouter
        .post('/register', requestValidator(registerValidator), checkRegistration,(req,res)=>{
                res.status(200).send({confirm:true, message:`Thank you for register ${req.body.username}. Please Login !`})

        })

        .post('/login', requestValidator(userValidator), checkUser, (req,res)=>{

        })

        .delete('/profile', async(req,res)=>{

                try{
                const profile = req.body.username
                const user = await User.findOne({username:profile})
                console.log(user)

                if(!user){
                        res.status(400).send({confirm: false, message:"User profile not found" })
                }
                user.remove()
                res.status(200).send({confirm: true, message:"profile deleted"})
                }catch(error){
                        console.log(error)
                }
        })











export default userRouter