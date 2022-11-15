const cors = require("cors");
const colors = require("colors");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");

//02:05

//connect to database
connectDB();

const app = express();
//app use
app.use(errorHandler);

//middleware
app.use(express.json());
app.use(cookieParser());
app.unsubscribe(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api/v1/auth", userRoute);

app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`.yellow.bold);
});
