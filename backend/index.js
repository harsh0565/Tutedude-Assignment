import express  from 'express';
import dotenv  from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js"
import friendRoutes from "./routes/friendRoute.js"
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();

const port = process.env.PORT || 5000;


app.use(cookieParser()); // This enables cookie parsing
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    credentials: true,                // Allow cookies to be sent
}));
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1" , friendRoutes);


app.get("/",(req,res)=>{
    res.send({
        message:"testing phase"
    })
})

connectDB();

app.listen(port ,()=>{
    console.log(`server is running at http://localhost:${port}`);
})