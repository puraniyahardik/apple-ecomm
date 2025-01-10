import jwt from "jsonwebtoken";

export const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        console.log(token)
        if(!token)
        {
            return res.json({success:false,message:"Not Authorized Admin Login"})

        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);

        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized Admin Login"})

        }

        next()
        // return res.json({success:true,token_decode})

    } catch (error) {
        console.log("ADMIN_AUTH ERROR:",error);
        return res.json({success:false,message:error.message})
    }
}