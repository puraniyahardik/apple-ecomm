import jwt from 'jsonwebtoken'

// const authUser=async(req,res,next)=>{

//     const {token}=req.headers;

//     if(!token){
//         return res.json({success:false,message:"Not a User Authrozied!"})
//     }

//     try {
//         const token_decode=jwt.verify(token,process.env.JWT_SECRET)
//         req.body.userId=token_decode.id
//         next()
//     } catch (error) {
//         console.log(error)
//         return res.json({success:false,message:error.message})
//     }
// }
const authUser = async (req, res, next) => {
    const token = req.headers['token']; // Extract the token

    console.log("Received token:", token); // Log received token

    if (!token) {
        return res.json({ success: false, message: "Not a User Authorized!" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", token_decode); // Log decoded token
        req.body.userId = token_decode.id; // Add userId to req.body
        next();
    } catch (error) {
        console.log("Token verification error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};



export default authUser;