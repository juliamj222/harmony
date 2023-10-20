require("dotenv").config();
const express = require("express");
const app = express();
const messageController = require("./controllers/message.controller");
const userController = require("./controllers/user.controller");
const roomController = require("./controllers/room.controller");

const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DBName = process.env.DBName;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL+DBName);
const db = mongoose.connection;
db.once("open", () => {
    console.log("connected to the DB", DBName);
});

app.use(express.json());

app.use("/message", messageController);
app.use("/user", userController);
app.use("/room", roomController);

app.listen(PORT, ()=>{
console.log(`server is running on port: ${PORT}`);
});

