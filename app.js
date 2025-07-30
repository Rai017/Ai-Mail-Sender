const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb is Connected"))
.catch((err)=> console.log("Mongodb is not Connected",err));

const authRoutes = require("./routes/authRoutes");
const mailRoutes = require("./routes/mailRoutes");

app.use("/", authRoutes);
app.use("/", mailRoutes);




app.listen(process.env.PORT);