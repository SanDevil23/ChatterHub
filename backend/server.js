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
});

