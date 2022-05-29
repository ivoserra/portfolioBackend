import mongoose from 'mongoose'


const required = true
const trim = true
const unique= true

const projectSchema = new mongoose.Schema({
    "name": {type:String},
    "title":{ type:String, required, trim , unique},
    "year":{ type:String, },
    "description":{ type:String },
    "tools":{ type:[String] },
    "responsive":{ type:String },
    "repository":{ type:String, trim },
    "deploy":{ type:String, trim },
    "author":{ type:String , trim},
    "video":{ type:String , trim},
    "image": { type:String , trim},
    "type":{ type:String, required }
},{timestamps:true})

const dataProject = mongoose.model("project", projectSchema)

export default dataProject