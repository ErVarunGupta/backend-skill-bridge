import express from 'express';
import cors from 'cors';
import { dbConnection } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js'
import helpRoutes from './src/routes/helpRoutes.js'
import profileRoutes from './src/routes/profileRoutes.js'

const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json())

app.get("/test", async(req, res)=>{
    res.json({
        message: "Test route was successfull!"
    })
})

app.use("/api", authRoutes)
app.use("/api", helpRoutes)
app.use("/api", profileRoutes)


app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`Server is listening on ${PORT}`)
    dbConnection();
})