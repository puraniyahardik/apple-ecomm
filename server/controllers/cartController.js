//add produts to user cart

import userModel from "../models/userModel.js"

// export const AddToCart=async(req,res)=>{

//     try {

//         const {userId,itemId,size}=req.body

//         const userData = await userModel.findById(userId)

//         let cartData = await userData.cartData;
        

//         if(cartData[itemId]){

//             console.log(cartData);
            
//             if(cartData[itemId][size]){
//                 cartData[itemId][size]+=1
//             }else{
//                 cartData[itemId][size]=1
//             }
//         }else{
//             cartData[itemId]={}
//             cartData[itemId][size]=1
//         }

//         await userModel.findByIdAndUpdate(userId,{cartData})
//         return res.json({success:true,message:"Added To Product In Cart"})
//     } catch (error) {
//         console.log(error)   
//       return res.json({success:false,message:error.message})
//     }
// }

// //update cart
// export const UpdateCart=async(req,res)=>{
//     try {
//         const {userId,itemId,size,quantity}=req.body

//         const userData=await userModel.findById(userId)

//         let cartData=await userData.cartData;

//         cartData[itemId][size]=quantity


//         await userModel.findByIdAndUpdate(userId,{cartData})
//         return res.json({success:true,message:"Cart Updated"})
//     } catch (error) {
//         console.log(error)   
//         return res.json({success:false,message:error.message})
//     }    

// }

// //get user cart
// // export const GetUserCart=async(req,res)=>{
// //     try {
// //         const {userId}=req.body

// //         const userData=await userModel.findById(userId)

// //         let cartData=await userData.cartData;

// //         return res.json({success:true,cartData})
// //     } catch (error) {
// //         console.log(error)   
// //         return res.json({success:false,message:error.message})

// //     }   
// // }

// export const GetUserCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         console.log("User ID from token:", userId); // Log userId

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             console.log("No user found with this ID.");
//             return res.json({ success: false, message: "User not found!" });
//         }

//         const cartData = userData.cartData;
//         console.log("Cart Data:", cartData); // Log cart data
//         return res.json({ success: true, cartData });
//     } catch (error) {
//         console.log("Error fetching user cart:", error.message);
//         return res.json({ success: false, message: error.message });
//     }
// };



export const AddToCart = async (req, res) => {
    try {
      const userId = req.userId; // Get from middleware
      const { itemId, size } = req.body; // Only itemId and size from body
  
      console.log('User ID from token:', userId); // Debug log
      if (!userId) {
        return res.json({ success: false, message: "User ID is required from authentication" });
      }
      if (!itemId || !size) {
        return res.json({ success: false, message: "Item ID and size are required" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.json({ success: false, message: "No user found with this ID" });
      }
  
      let cartData = userData.cartData || {}; // Default to empty object if null
  
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
      console.log('AddToCart Error:', error);
      return res.json({ success: false, message: error.message });
    }
  };
  
  export const UpdateCart = async (req, res) => {
    try {
      const userId = req.userId; // Get from middleware
      const { itemId, size, quantity } = req.body;
  
      console.log('User ID from token:', userId); // Debug log
      if (!userId) {
        return res.json({ success: false, message: "User ID is required from authentication" });
      }
      if (!itemId || !size || quantity === undefined) {
        return res.json({ success: false, message: "Item ID, size, and quantity are required" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.json({ success: false, message: "No user found with this ID" });
      }
  
      let cartData = userData.cartData || {};
      cartData[itemId] = cartData[itemId] || {};
      cartData[itemId][size] = quantity;
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
      console.log('UpdateCart Error:', error);
      return res.json({ success: false, message: error.message });
    }
  };
  
  export const GetUserCart = async (req, res) => {
    try {
      const userId = req.userId; // Get from middleware
      console.log("User ID from token:", userId);
  
      if (!userId) {
        return res.json({ success: false, message: "User ID is required from authentication" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        console.log("No user found with this ID.");
        return res.json({ success: false, message: "User not found!" });
      }
  
      const cartData = userData.cartData || {};
      console.log("Cart Data:", cartData);
      return res.json({ success: true, cartData });
    } catch (error) {
      console.log("GetUserCart Error:", error.message);
      return res.json({ success: false, message: error.message });
    }
  };