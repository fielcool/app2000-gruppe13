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
app.use('/api/createUser', userRoutes);
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());

// app.use("/allinputs", responses);
// app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://b5-usn-506fb35bcb0a.herokuapp.com/", // Update with your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // tlsAllowInvalidHostnames: true,
  // tlsAllowInvalidCertificates: true,
};
mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

const answerSchema = new mongoose.Schema({
  data: Object,
  date: { type: Date, default: Date.now },
});

const Answer = new mongoose.model("Answer", answerSchema);

//for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.post("/api/createUser", (req, res) => {
  const filter = { "data.uuid": req.body.uuid };
  const update = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key] !== "") {
      update["data." + key] = req.body[key];
    }
  }

  Answer.findOneAndUpdate(
    filter,
    { $set: update },
    { upsert: true, new: true },
    function (err, doc) {
      if (!err) {
        console.log(update);
        res.send(doc);
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
});

//server
app.listen(port, function () {
  console.log("Express server launched...");
});
