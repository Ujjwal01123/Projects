require("dotenv/config");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { connectToDB } = require("./connectToDB");
const staticRouter = require("./routes/staticRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly } = require("./middleware/auth");

const API_url = process.env.API_URL;

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/", staticRouter);
app.use(API_url + "/products", restrictToLoggedInUserOnly, productRouter);
app.use(API_url + "/users", userRouter);

connectToDB(process.env.Connection_string)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () =>
  console.log(`${API_url} \n server started at port : ${PORT}`)
);
