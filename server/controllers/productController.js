import { v2 as cloudinary} from "cloudinary"
import productModel from '../models/productModel.js'
//function for Add Product
export const addProduct=async(req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller} = req.body;

        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 && req.files.image2[0];
        const image3=req.files.image3 && req.files.image3[0];
        const image4=req.files.image4 && req.files.image4[0];

        const images=[image1,image2,image3,image4].filter((item)=>item !==undefined)
        
        let imageUrl=await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        // genrate url and upload in Cloudinary
        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller === "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imageUrl,
            date:Date.now()
        }
      
        const product=new productModel(productData);
        await product.save();
        // console.log(name,description,price,category,subCategory,sizes,bestseller)    
        // console.log(images)
        // console.log(imageUrl)

        res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.log("ADD PRODUCT ERROR:",error)
        return res.json({success:false,messasge:error.message})
    }
}

// function for list product
export const listProduct=async(req,res)=>{
    try {
        const product=await productModel.find({})
        return res.json({success:true,product})
    } catch (error) {
        console.log("LIST PRODUCT ERROR:",error)
        return res.json({success:false,messasge:error.message})
    }
}
//function for remove porduct
export const removeProduct=async(req,res)=>{
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        return res.json({success:true,message:"Product Deleted SuccessFully"})
    } catch (error) {
        console.log("LIST PRODUCT ERROR:",error)
        return res.json({success:false,messasge:error.message})
    }
}

//function for single product info
export const signleProduct=async(req,res)=>{
    try {
        const {userID}=req.body.id;
        if(!userID){
            return res.json({success:false,message:"Product Not Found!"})
        }
        const product=await productModel.findById(userID)
        return res.json({success:true,product})
    } catch (error) {
        console.log("SIGNLE PRODUCT ERROR:",error)
        return res.json({success:false,messasge:error.message})
    }
}