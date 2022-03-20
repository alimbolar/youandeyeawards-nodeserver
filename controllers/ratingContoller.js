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

ratingController.updateOneRating = async function (req, res) {
  const id = req.params.id;

  const rating = await Rating.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      rating,
    },
  });
};

ratingController.deleteOneRating = async function (req, res) {
  const id = req.params.id;

  await Rating.findByIdAndDelete(id, (error, deletedRating) => {
    if (!error) {
      res.status(200).json({
        status: "success",
        data: {
          deletedRating,
        },
      });
    }
  });
};

module.exports = ratingController;
