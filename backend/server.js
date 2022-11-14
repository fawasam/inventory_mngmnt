const cors = require("cors");
const colors = require("colors");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

//middleware

//routes

//app use

//connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`.yellow.bold);
});
