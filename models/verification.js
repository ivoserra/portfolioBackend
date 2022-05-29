import mongoose from 'mongoose'


const verificationSchema = new mongoose.Schema({

    code: String,
    userId: String

}, { timestamps: true })


const Verification = mongoose.model("verification", verificationSchema)

export default Verification