import userModel from "../models/userModel.js";

export const getAllUser = async (req, res) => {
  try {
    // Extract the logged-in user's ID from the decoded token
    const loggedInUserId = req.user._id;

    // Find all users except the logged-in user
    const users = await userModel.find({ _id: { $ne: loggedInUserId } });

    const userData = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
    }));

    res.status(200).send({
      success: true,
      message: "All users (except the logged-in user) fetched successfully",
      users: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to fetch all users",
    });
  }
};

export const sendFriendReq = async (req, res) => {
 
  const loggedInUserId = req.user._id;
  try {
    const { id } = req.body;
    console.log(id);
    const user = await userModel.findById(id);
    if (!user) {
      return res.send({
        success: false,
        message: "user does not exist",
      });
    }
    if (user.pendingReq.includes(loggedInUserId)) {
      return res.send({
        success: false,
        message: "Friend request already sent",
      });
    }

    user.pendingReq.push(loggedInUserId);

    await user.save();
    res.status(200).send({
      success: true,
      message: "Friend request sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const allPendingRequests = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const user = await userModel.findById(loggedInUserId).populate({
      path: "pendingReq", // Field to populate
      select: "_id name email", // Fields to return from the populated documents
    });
    res.status(200).send({
      success: true,
      message: "All Pending Requests",
      pendingRequests: user.pendingReq,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const friendList = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find the logged-in user and populate the friendList array with user details
    const user = await userModel.findById(loggedInUserId).populate({
      path: "friendList", // Field to populate
      select: "name email", // Fields to return from the populated documents
    });

    res.status(200).send({
      success: true,
      message: "Friend list fetched successfully",
      friends: user.friendList, // Now contains populated user details
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const acceptReq = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id } = req.body;
    const user = await userModel.findById(id);
    const loginUser = await userModel.findById(loggedInUserId);

    if (!loginUser.pendingReq?.includes(id)) {
      return res.send({
        success: false,
        message: "There is no pending friend request from this user",
      });
    }

    user.friendList.push(loggedInUserId);
    loginUser.friendList.push(user._id);

    loginUser.pendingReq = loginUser.pendingReq.filter(
      (reqId) => reqId.toString() !== id
    );

    await user.save();
    await loginUser.save();
    res.status(200).send({
      success: true,
      message: "Friend request accepted successfully you are now friends",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

// export const fetchSingleUserController =async(req,res)=>{
//     try {
//         const {id}  =

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Something went wrong"
//         });

//     }
// }
