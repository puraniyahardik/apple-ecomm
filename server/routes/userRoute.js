import express from 'express'
import { adminLogin, loginUser, registorUser } from '../controllers/userController.js';

const userRoute=express.Router();

userRoute.post('/registor',registorUser)
userRoute.post('/login',loginUser)
userRoute.post('/admin',adminLogin)



export default userRoute;