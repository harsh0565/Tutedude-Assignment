import express from "express";
import { loginController, logoutController, registerController } from "../controllers/authController.js";
import { requiredSignIn } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/register" , registerController);
router.post("/login",loginController);
router.delete("/logout",logoutController);


// router.get("/user-auth", requiredSignIn, (req,res)=>{
//     res.status(200).send({
//         ok:true
//     })
// })

export default router;