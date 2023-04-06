if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();

require("./db/mongoose");

const port = process.env.PORT || 8000;

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log("Server started at port " + port);
});
