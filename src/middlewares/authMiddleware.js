import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authValidation = async(req, res, next)=>{
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(404).json({
                message: "Token is not provided",
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        req.user = await User.findById(decoded.id);

        // req.user = await User.findOne({token});
        // console.log(req.user)

        if(!req.user){
            return res.status(404).json({
                message: "User not found!",
                success: false
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}