const mongoose = require("mongoose");

const opticianRatingSchema = new mongoose.Schema({
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
});

// const opticianRatingSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   phone: String,
//   ec: Number,
//   sq: Number,
//   ce: Number,
//   os: Number,
// });

const OpticianRating = mongoose.model("OpticianRating", opticianRatingSchema);

module.exports = OpticianRating;
