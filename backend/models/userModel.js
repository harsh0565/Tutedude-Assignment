// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required: true,
//         trim: true

//     },
//     email:{
//         type:String,
//         required: true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required: true
//     },
//     pendingReq:{
//         type: Array,
//         default: null  
//     },
//     friendList:{
//         type: Array,
//         default: null  
//     }

// }, {timestamps :true})

// export default mongoose.model("users",userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Updated to store ObjectId references to users who sent friend requests
    pendingReq: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  // Referencing the users collection
    }],
    // Updated to store ObjectId references to friends
    friendList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  // Referencing the users collection
    }]
}, { timestamps: true });

export default mongoose.model("users", userSchema);
