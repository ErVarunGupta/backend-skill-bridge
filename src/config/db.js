import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

const mongo_url = process.env.MONGO_URI;

export const dbConnection = ()=>{
    mongoose.connect(mongo_url).then(()=>{
        console.log("Database is connected successfully!")
    }).catch(err => {
        console.log("Error during database connection: ", err);
    })
}