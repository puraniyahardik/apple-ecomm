import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const CreateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET)
}

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',

    //sender
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //     user: 'jaunita.orn@ethereal.email',
    //     pass: '9crCG4JRx2BB7HNzmj'
    // }
  });
//forgot password Request
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log('Received forgot password request for:', email);
  
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email address!" });
      }
  
      const user = await userModel.findOne({ email });
      console.log('User lookup result:', user ? user._id : 'Not found');
      if (!user) {
        return res.json({ success: false, message: "User not found!" });
      }
  
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
      await user.save();
      console.log('User updated with reset token:', user.resetToken);
  
      const resetLink = `${process.env.RESET_URL}?token=${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset.</p>
          <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
          <p>This link expires in 1 hour.</p>
        `,
      };
  
      console.log('Sending email with options:', mailOptions);
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', email);
  
      res.json({ success: true, message: "Password reset link sent to your email!" });
    } catch (error) {
      console.error('Forgot Password Error:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
        details: error.response?.data || error,
      });
      res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  };
  
 

//Reset password
export const resetPassword = async (req, res) => {
    try {
      const { token, password } = req.body;
  
      if (!token || !password) {
        return res.json({ success: false, message: "Token and new password are required!" });
      }
      if (password.length < 8) {
        return res.json({ success: false, message: "Password must be at least 8 characters!" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({
        _id: decoded.id,
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.json({ success: false, message: "Invalid or expired reset token!" });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update user
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
  
      res.json({ success: true, message: "Password reset successfully!" });
    } catch (error) {
      console.log("Reset Password Error:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  

//route for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Does not Exists!" })
        }
        //validationg email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter A Valid Email Address!" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter A Strong Password!" })
        }
        //campare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = CreateToken(user._id)
            // console.log('UserToken:',token)
            return res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: "Invalid Credentails " })
        }


    } catch (error) {
        console.log("Login ERROR:", error)
        res.json({ success: false, message: error.message })
    }
}

//route for user registor
export const registorUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists!" })
        }
        //validationg email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter A Valid Email Address!" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter A Strong Password!" })
        }

        //Hash The user Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = CreateToken(user._id)

        // console.log(token);

        res.json({ success: true, token })

    } catch (error) {
        console.log("REGISTOR ERROR:", error)
        res.json({ success: false, message: error.message })
    }
}

//route for admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            // console.log(token)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "INVALID CREDENTIALS" })
        }
    } catch (error) {
        console.log("ADMIN LOGIN ERROR:", error)
        res.json({ success: false, message: error.message })
    }
}

//routes for profile

export const ProfileInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({
            success: true,
            user: { name: user.name, email: user.email, password: user.password },
        });
    } catch (error) {
        console.log("PROFILE ERROR:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};