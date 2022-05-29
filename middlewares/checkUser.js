import crypto from 'crypto'
import User from '../models/User.js';
import Project from '../models/Project.js'



export default async function checkUser(req,res){

    try{
        const payload = req.body;

        const user = await User.findOne({username:payload.username})
        if(!user){
            return res.status(400).send({confirm:false, alert:"user or password do not match"})

        }
        const checkHash = crypto.pbkdf2Sync(payload.password, user.salt, 1000, 64, 'sha512').toString('hex')
        const project = await Project.find()

        if(user.password !== checkHash){
            res.status(404).send({confirm: false, alert:'user or password do not match' })
            return
        }
        return res.send({confirm:true, message:`welcome back ${user.username}`, username:user.username, type: user.type})

    }catch(error){
        res.send(error.message)
    }
}