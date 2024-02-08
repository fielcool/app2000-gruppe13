// const responses = require("./routes/route");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
//const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 8080;

process.on("uncaughtException", function (err) {
  console.log(err);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use('api/createUser', userRoutes);

// app.use("/allinputs", responses);
// app.use(express.urlencoded({ extended: true }));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // tlsAllowInvalidHostnames: true,
  // tlsAllowInvalidCertificates: true,
};
mongoose
  
  .connect(process.env.MONGODB_URI, options)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));



//for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


//server
app.listen(port, function () {
  console.log("Express server launched...");
});
