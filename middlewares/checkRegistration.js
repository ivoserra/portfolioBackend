import crypto from 'crypto'
import User from '../models/User.js'


export default async function checkRegistration(req,res,next){
    
    const payload = req.body
    const match = await User.findOne({username:payload.username})

    if(match){
        res.status(404).send({confirm:false, message:'this username already exists'})
        return
    }

    const password = payload.password
    const salt = crypto.randomBytes(10).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const newUser= await User.create({username:payload.username, password:hash, salt:salt, type:!payload.type ? "visitor" :"admin"}) 
    console.log('register', newUser)
    next()

}