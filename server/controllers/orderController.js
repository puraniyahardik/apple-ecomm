

import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';

// Global variables
const currency = 'usd';
const deliveryCharge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

export const placeOrder = async (req, res) => {
  try {
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new Error('User ID is required from authentication');
    }
    if (!Array.isArray(items) || items.length === 0) {
      console.log('Items validation failed. Items received:', items);
      throw new Error('Items array is required and must not be empty');
    }
    if (!amount || typeof amount !== 'number') {
      throw new Error('Amount is required and must be a number');
    }
    if (!address) {
      throw new Error('Address is required');
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: 'Order Placed!' });
  } catch (error) {
    console.log('Place Order Error:', error);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    // console.log('Request headers:', req.headers); // Debug log
    // console.log('Request body:', req.body); // Debug log
    const { items, amount, address } = req.body; // Removed userId from body
    const userId = req.userId; // Use req.userId from middleware
    const { origin } = req.headers;

    if (!userId) {
      throw new Error('User ID is required from authentication');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Items array is required and must not be empty');
    }
    if (!amount || typeof amount !== 'number') {
      throw new Error('Amount is required and must be a number');
    }
    if (!address) {
      throw new Error('Address is required');
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 2
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log('placeOrderStripe Error:', error);
    return res.json({ success: false, message: error.message });
  }
};

export const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body; // Removed userId from body
    const userId = req.userId; // Use req.userId from middleware

    if (!userId) {
      throw new Error('User ID is required from authentication');
    }

    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false });
    }
  } catch (error) {
    console.log('verifyStripe Error:', error);
    return res.json({ success: false, message: error.message });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body; // Removed userId from body
    const userId = req.userId; // Use req.userId from middleware

    if (!userId) {
      throw new Error('User ID is required from authentication');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Items array is required and must not be empty');
    }
    if (!amount || typeof amount !== 'number') {
      throw new Error('Amount is required and must be a number');
    }
    if (!address) {
      throw new Error('Address is required');
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Razorpay',
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.log('placeOrderRazorpay Error:', error);
    return res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body; // Removed userId from body
    const userId = req.userId; // Use req.userId from middleware

    if (!userId) {
      throw new Error('User ID is required from authentication');
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: 'Payment Successful' });
    } else {
      return res.json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    console.log('verifyRazorpay Error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// Other functions remain unchanged...

export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId from authUser
    console.log('Fetching orders for userId:', userId); // Debug log

    if (!userId) {
      return res.json({ success: false, message: 'User ID is required from authentication' });
    }

    const orders = await orderModel.find({ userId });
    console.log('Orders found:', orders); // Debug log

    return res.json({ success: true, orders });
  } catch (error) {
    console.log('userOrders Error:', error);
    return res.json({ success: false, message: error.message });
  }
};

export const UpdateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.json({ success: true, message: "Status Updated!" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};