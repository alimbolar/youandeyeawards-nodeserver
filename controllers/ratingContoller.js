const ratingController = {};
const Rating = require("../models/ratingModel");

ratingController.opticianRating = function (req, res) {
  res.send("Hello World");
};

ratingController.addOpticianRating = async function (req, res) {
  console.log(req.body);
  const rating = await Rating.create(req.body);
  // const rating = new OpticianRating(req.body);
  // await rating.save();

  res.status(200).json({
    status: "success",
    data: {
      rating,
    },
  });
};

module.exports = ratingController;
