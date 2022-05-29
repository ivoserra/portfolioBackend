import mongoose from 'mongoose'

const required = true
const trim = true


const userSchema = new mongoose.Schema({
    
    "username":{type:String, trim},
    "password":{type: String, required},
    "salt":{type:String, required},
    "type":{type:String}

},{timestamps:true})


const User = mongoose.model("user", userSchema)

export default User 