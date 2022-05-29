import express from 'express'
import Project from '../models/Project.js'
import User from '../models/User.js'

import requestValidator from '../middlewares/requestValidator.js'
import projectValidator from '../validators/projectValidator.js'
import updateValidator from '../validators/updateValidator.js'


const projectRouter = express.Router()

projectRouter   
        
    .get("/", async(req,res, next)=>{
        const project = await Project.find()
        res.status(200).send({confirm:true, message:"Your database says hello", project:project})

    })
    .get("/:id", async(req,res,next)=>{

        try{

            const project = await Project.findById(req.params.id)
            if(!project){
                return res.status(400).send({confirm:false, message:'this project was not found'})
            }
            res.send({confirm:true, message: "Your database says Hello", project:project})
        }catch(error){
            next(error)
        }
    })
    .post("/",requestValidator(projectValidator), async(req,res)=>{

     
        try{

            const user = await User.find(req.body.username)
            // if(user.type !== "admin"){
            //     res.status(401).send({confirm: false, message: "You are not authorized to publish projects"})
            // }
            const payload= req.body
            const project = await Project.create(payload)
            res.status(200).send({ confirm:true, message:"New project created", project:project })

        }catch(error){
            res.status(400).send(error.message)
        }
    })
    .patch("/:id", requestValidator(updateValidator), async(req,res,next)=>{

        try{
            const payload = req.body
            const id = req.params.id
            const user = await User.find(req.body.username)
            // if(user.type !== "admin"){
            //     res.status(401).send({confirm: false, message: "You are not authorized to edit projects"})
            // }
            const project = await Project.findByIdAndUpdate(id)
            if(!project){
                return res.status(400).send({confirm:false, message:'Project not found'})
            }
            project.set(payload)
            project.save()
            res.status(200).send({confirm:true, message:'project Up to date', project:project})

        }catch(error){
            next(createError(400, error.message))
        }

    })
    .delete("/:id", async(req,res, next)=>{
        try{
            const project = await Project.findById(req.params.id)
            const user = await User.find(req.body.username)
            // if(user.type !== "admin"){
            //     res.status(401).send({confirm: false, message: "You are not authorized to edit projects"})
            // }
            if(!project){
                return res.status(400).send({confirm:false, message:"project not found"}) 
            }
            project.remove()
            
            res.status(200).send({confirm:true, message:"your project has been deleted"})
        }catch (error){
            next(createError(400, error.message))
        }

    })
  


    export default projectRouter