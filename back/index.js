const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cors = require("cors");
app.use(cors());


app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
