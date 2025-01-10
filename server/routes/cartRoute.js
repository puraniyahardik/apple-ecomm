import express from 'express'
import { AddToCart, GetUserCart, UpdateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRoute=express.Router();

cartRoute.post('/add',authUser,AddToCart)
cartRoute.post('/update',authUser,UpdateCart)
cartRoute.post('/get',authUser,GetUserCart)

export default cartRoute