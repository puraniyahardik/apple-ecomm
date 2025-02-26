import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {
  const token = req.headers['token']; // Extract the token

  // console.log("Received token:", token); // Log received token

  if (!token) {
    return res.status(401).json({ success: false, message: "Not a User Authorized!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", token_decode); // Log decoded token
    req.userId = token_decode.id; // Set req.userId instead of req.body.userId
    next();
  } catch (error) {
    console.log("Token verification error:", error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};



export default authUser;