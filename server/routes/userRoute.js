import express from 'express'
import { adminLogin, forgotPassword, loginUser, ProfileInfo, registorUser, resetPassword } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRoute=express.Router();

userRoute.post('/registor',registorUser)
userRoute.post('/login',loginUser)
userRoute.post('/admin',adminLogin)
userRoute.get('/profile',authUser, ProfileInfo)
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/reset-password', resetPassword);



export default userRoute;