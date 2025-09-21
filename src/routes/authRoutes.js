import { Router } from "express";
import { getUserProfile, getUsersProfile, Login, Register, updateUserProfile, uploadProfilePicture } from "../controllers/authController.js";
import { authValidation } from "../middlewares/authMiddleware.js";
const router = Router();
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage});

router.post("/upload_profile_picture", authValidation, upload.single("image"), uploadProfilePicture)

router.post("/register", Register)
router.post("/login", Login)
router.get("/user", authValidation, getUserProfile);
router.get("/users", authValidation, getUsersProfile);
router.put("/user_update", authValidation, updateUserProfile);


export default router;