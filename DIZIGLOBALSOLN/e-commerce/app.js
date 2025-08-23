// importing all modules....
require("dotenv/config");
const express = require("express");
const { connectToDb } = require("./connectToDb");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const orderRouter = require("./routers/orders");
const userRouter = require("./routers/user");
const cors = require("cors");
const { authJwt } = require("./middleware/auth");
const { errorHandler } = require("./middleware/ErrorHandler");

// importing env variable.....
const api = process.env.API_url;

// getting an express app...
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(authJwt);
app.use(errorHandler);

app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);

// calling connect to db function
connectToDb(process.env.DB_URL)
  .then(() => console.log("database connected successfully.."))
  .catch(() => console.log("error in the database connectivity..."));

// listing app on port : 8000
app.listen(port, () => console.log(`server started at port : ${port}`));
