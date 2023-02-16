const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const dotenv = require("dotenv");
const colors = require("colors");
const ConnectionDB = require("./config/db");
const logger = require("morgan"); //its showa hit method in console

//configure
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

//database connect
ConnectionDB();

//routes
app.use("/api/v1/", require("./routes/productRoutes"));

//url to provide access for inage
app.use(express.static("public/gallery"));

//server is working or not
app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

//port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT}`.cyan.underline.bold
  );
});
