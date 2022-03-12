const ratingController = {};
const path = require("path");

ratingController.opticianRating = function (req, res) {
  res.send("Hello World");
};

ratingController.addOpticianRating = function (req, res) {
  res.json({
    status: "success",
  });
};

module.exports = ratingController;
