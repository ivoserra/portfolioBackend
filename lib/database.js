import mongoose from 'mongoose'


export function connect(){

    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
   // const connectionString=`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
 const connectionString= "mongodb+srv://johnny2022:johnny2022@cluster0.fwgr9.mongodb.net/schemaAndModel"

    // Mongoose connection events
    mongoose.connection.on('connecting', () => console.log("[DB] connecting"))
    mongoose.connection.on('connected', () => console.log("[DB] connected"))
    mongoose.connection.on('disconnecting', () => console.log("[DB] disconnecting"))
    mongoose.connection.on('disconnected', () => console.log("[DB] disconnected"))
    mongoose.connection.on('reconnected', () => console.log("[DB] reconnected"))
    mongoose.connection.on('error', error => console.log("[DB] error", error))

    mongoose.connect(connectionString)
}


