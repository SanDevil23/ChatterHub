const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes")

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { Socket } = require("socket.io");

dotenv.config();
connectDB();

const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,                               
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(express.json()); //to accept json data

app.get("/", (req, res) => {
  res.send("API  is running");
});

const anonymous = () => {};

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

 const server = app.listen(
  port,
  console.log(`Server is up and running on PORT ${port}`.blue.bold)
);

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  // to avoid any cross connection
  cors:{
    origin:"http://localhost:3000"
  },
});


// create connection
io.on("connection", (socket)=>{
  console.log("Socket.io Connected !! ");

  // establishing a separate socket for each user
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
  
});

