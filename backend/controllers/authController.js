import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
export const registerController = async (req, res) => {
  try {
    const { name, email,password} = req.body;
    if (!name) {
      return res.send({
        message: "name is required",
      });
    }
    if (!email) {
      return res.send({
        message: "email is required",
      });
    }
    if (!password) {
      return res.send({
        message: "password is required",
      });
    }
   

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "already register please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({
      name,
      email,
     
      password: hashedPassword,
      
    });
    return res.send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {

    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
    
  }
};


// export const loginController =async(req,res)=>{
//     try {
//         const {email,password} = req.body;
//         if(!email || !password){
//             return res.send({
//                 success:false,
//                 message:"Invalid email or password"
//             })
//         }
//         const user = await userModel.findOne({email});
//         if(!user){
//             return res.send({
//                 success:false,
//                 message:"Email is not registered"
//             })
//         }

//         const match = await comparePassword(password , user.password)
//         if(!match){
//             return res.send({
//                 success:false,
//                 message:"Invalid Password" 
//             })
//         }
    
//         // create token
//         const token = await JWT.sign({_id:user._id} , process.env.JWT_SECRET , {
//             expiresIn:"1D",
//         });

//         res.status(201).send({
//             success: true,
//             message: "login successfully",
//             user:{
//                 name: user.name,
//                 email: user.email
//             },
//             token
//           });

//     } catch (error) {
//         console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error in login",
//       error,
//     });
//     }
// }


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation checks
        if (!email || !password) {
            return res.send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.send({
                success: false,
                message: "Email is not registered",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Create JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d", // Token valid for 1 day
        });

        // Set token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,    // Makes the cookie inaccessible to JavaScript in the frontend
                // Use this in production with HTTPS
            // sameSite: 'strict', // Protects against CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });

        // Send success response without sending token in body
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};


// Logout Controller
export const logoutController = (req, res) => {
  try {
    // Clear the JWT cookie by setting its expiration to the past
    res.cookie('token', '', {
      httpOnly: true,
      secure: true, // Set this to `false` if not using HTTPS (for development only)
      sameSite: 'strict',
      expires: new Date(0), // Set the cookie expiration to 0 to clear it
    });

    res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong during logout",
    });
  }
};





