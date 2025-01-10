import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/db.js';
import ConnectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import OrderRouter from './routes/orderRoute.js';

//app config
const app=express()
const port=process.env.PORT || 4000;
ConnectDB()
ConnectCloudinary()
//middleware
app.use(express.json())
app.use(cors())


app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',OrderRouter)
//api endpoints
app.get('/',(req,res)=>{
    res.send("HELLO WORLD!")
})

//start express server
app.listen(port,()=>{
    console.log("SERVER IS RUNNING AT:",port)
})