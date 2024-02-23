const asyncHandler = require("express-async-handler");
const { use } = require("../routes/userRoutes");
const Chat = require("../models/chatModel");
const User = require("../models/userModel")

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate("users", "-password").populate("latestMessage");

  isChat = await User.populate(isChat, {
    path:'latestMessage.sender',
    select: "name pic email",
  });

  if(isChat.length>0){
    req.send(isChat[0]);
  }else{
    var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId ], 
    };

    try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
            "users", 
            "-password"
        );
            res.status(200).send(FullChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
  }
});

module.exports = { accessChat };
