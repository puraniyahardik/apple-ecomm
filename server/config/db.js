import mongoose from "mongoose";

const ConnectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("MONGODB CONNECTED!");
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/E-commerce`)
}
export default ConnectDB;