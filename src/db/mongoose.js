const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("database connected");
  });
