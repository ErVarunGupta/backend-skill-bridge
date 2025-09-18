import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import Profile from "../models/ProfileModel.js";
import dotenv from 'dotenv'
import cloudinary from "../config/cloudinary.js";
dotenv.config();

export const Register = async(req, res)=>{
    const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const token = crypto.randomBytes(32).toString("hex");
    
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "24h"});

    const user = await newUser.save();
    const profile = new Profile({ userId: newUser._id });
    await profile.save();

    return res.status(200).json({
      message: "User registered successfully!",
      success: true,
      user,
      username: user.username,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
export const Login = async(req, res)=>{
    const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({email});

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    const dcryptPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!dcryptPassword) {
      return res.status(404).json({
        message: "Invalid credential!",
        success: false,
      });
    }

    const token = jwt.sign({id:existingUser._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    existingUser.token = token;
    await existingUser.save();

    // await User.updateOne({userId: existingUser._id}, {token});
    return res.status(200).json({
      message: "User successfully logged in!",
      success: true,
      user: existingUser,
      username: existingUser.username,
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export const getUserProfile = async(req, res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message: "User not found!",
        success: false
      })
    }

    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}


export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, username } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    if (email) {
      const otherUser = await User.findOne({ email, _id: { $ne: userId } });
      if (otherUser) {
        return res.status(400).json({
          message: "Email already in use, please try another one",
          success: false,
        });
      }
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully!",
      success: true,
      user, 
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const uploadProfilePicture = async(req, res)=>{
  const userId = req.user.id;
  try {
    if(!req.file){
      return res.status(404).json({
        message: "No file uploaded",
        success: false
      })
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message: "User not found!",
        success: false
      })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pics", 
    });

    user.profilePicture = result.secure_url;
    // user.profilePicture = req.file.filename;

    await user.save();

    return res.status(200).json({
      message: "Profile picture updated!",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}
