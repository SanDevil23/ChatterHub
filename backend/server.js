const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); //to accept json data

app.get("/", (req, res) => {
  res.send("API  is running");
});

const anonymous = () => {};

app.use("/api/user", userRoutes);
app.use("/api/chat", anonymous);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(
  port,
  console.log(`Server is up and running on PORT ${port}`.blue.bold)
);
