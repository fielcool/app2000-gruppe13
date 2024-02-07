// const { Response } = require("../models/model");
const { Answer } = require("../models/model");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const filter = { "data.uuid": req.body.uuid };
  const update = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key] !== "") {
      update["data." + key] = req.body[key];
    }
  }

  await Answer.findOneAndUpdate(
    filter,
    { $set: update },
    { upsert: true, new: true },
    function (err, doc) {
      if (!err) {
        console.log(doc);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
