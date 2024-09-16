// import JWT  from 'jsonwebtoken';
// export const requiredSignIn= async(req,res,next) =>{
//     try {
//         const decode = JWT.verify(req.headers.authorization , process.env.JWT_SECRET);
//         req.user = decode;
//         next();
//     } catch (error) {
//        console.log(error); 
//     }
// }


import JWT from 'jsonwebtoken';

// Middleware to verify the JWT token from cookies
export const requiredSignIn = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: 'No token, authorization denied',
            });
        }

        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.log(error);
        res.send({
            message: 'Invalid token',
        });
    }
};


