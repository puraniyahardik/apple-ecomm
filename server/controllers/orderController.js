
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay'
//placing order using COD

//global variables
const currency='usd'
const deliveryCharge=10


const stripe=new Stripe(process.env.STRIPE_SECRET)

const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})
export const placeOrder=async(req,res)=>{
    try {
        
        const {userId,items,amount,address}=req.body;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed!"})

    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
//placing order using stripe
export const placeOrderStripe=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
        const {origin}=req.headers

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save()

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge * 100
            },
            quantity:2
        })
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
//verify Stripe Payment
export const verifyStripe=async(req,res)=>{
    try {
        const {orderId,success,userId} =req.body

        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            return res.json({success:true});

        }else{
            await orderModel.findByIdAndDelete(orderId)
            return res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//placing order using Razorpay
export const placeOrderRazorpay=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()

        const options={
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message:error})
            }

            return res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

export const verifyRazorpay=async(req,res)=>{
    try {
        const {userId,razorpay_order_id}=req.body

        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)

        // console.log(orderInfo)

        if(orderInfo.status==='paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            return res.json({success:true,message:'Payment Successfull'})
        }else{
           return res.json({success:false,message:'Payment Failed'})
        }

    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//all order Data for Admin Panel

export const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//display Order Data for Frontend
export const userOrdes=async(req,res)=>{
    try {
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

//update Order Status From Admin Panel
export const UpdateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})

        return res.json({success:true,message:"Status Updated!"})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}