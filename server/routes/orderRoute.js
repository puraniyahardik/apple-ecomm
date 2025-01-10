import express from 'express'
import { adminAuth } from '../middleware/adminAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, UpdateStatus, userOrdes, verifyRazorpay, verifyStripe } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const OrderRouter=express.Router()
//--------------admin--------------------//
//display all order for admin
OrderRouter.post('/list',adminAuth,allOrders)

//status update for admin
OrderRouter.post('/status',adminAuth,UpdateStatus)


//----------------------payment--------------------//

//placeOrder COD
OrderRouter.post('/place',authUser,placeOrder)

//placeOrder Stripe
OrderRouter.post('/stripe',authUser,placeOrderStripe)

//placeOrder RazorPay
OrderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//--------------------use---------------------------------//

//user Orders 
OrderRouter.post('/userOrder',authUser,userOrdes)

//------------------verify payment----------------------//
OrderRouter.post('/verifyStripe',authUser,verifyStripe)

OrderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default OrderRouter;