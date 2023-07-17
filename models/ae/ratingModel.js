const mongoose = require("mongoose");
const Optician = require("./opticianModel");

const ratingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  optician: {
    type: String,
    required: [true, "Optician Name is required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  opticianId: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Head Office Address is required"],
  },
  stores: {
    type: Number,
    required: [true, "Stores is required"],
  },
  category: {
    type: String,
  },
  segment: {
    type: String,
  },

  ec: {
    type: Number,
    required: [true, "Eyewear Collection Ratings are required"],
  },
  sq: {
    type: Number,
    required: [true, "Service Quality Ratings are required"],
  },
  ce: {
    type: Number,
    required: [true, "Clinical Expertise Ratings are required"],
  },
  os: {
    type: Number,
    required: [true, "Overall Satisfaction Ratings are required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userIp: {
    type: String,
  },
});

ratingSchema.statics.calcAverageRating = async function (opticianId) {
  // console.log(opticianId);
  const [stats] = await this.aggregate([
    {
      $match: { opticianId },
    },
    {
      $group: {
        _id: "$opticianId",
        nRatings: { $sum: 1 },
        ecAverage: { $avg: "$ec" },
        sqAverage: { $avg: "$sq" },
        ceAverage: { $avg: "$ce" },
        osAverage: { $avg: "$os" },
      },
    },
  ]);

  await Optician.findOneAndUpdate(
    { opticianId },
    {
      nRatings: stats.nRatings,
      ecAverage: stats.ecAverage,
      sqAverage: stats.sqAverage,
      ceAverage: stats.ceAverage,
      osAverage: stats.osAverage,
    }
  );

  // console.log(stats);
};

ratingSchema.post("save", async function () {
  this.constructor.calcAverageRating(this.opticianId);
});

ratingSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this);
  next();
});

ratingSchema.post(/^findOneAnd/, async function () {
  this.r.controller.calcAverageRating(this.r.opticianId);
});

const Rating = mongoose.model("AERating", ratingSchema);

module.exports = Rating;
