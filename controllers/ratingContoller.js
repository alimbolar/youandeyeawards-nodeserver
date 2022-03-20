const ratingController = {};
const Rating = require("../models/ratingModel");

ratingController.getAllRatings = async function (req, res) {
  const rating = await Rating.find();

  res.status(200).json({
    status: "success",
    data: rating,
  });
};

ratingController.createOneRating = async function (req, res) {
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
