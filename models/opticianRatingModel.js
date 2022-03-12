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
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  opticianId: {
    type: String,
  },
  rating: {
    type: Object,
    required: [true, "Ratings are required"],
  },
});

// const opticianRatingSchema = new mongoose.Schema({
//   fullName: String,
// });

const OpticianRating = mongoose.model("OpticianRating", opticianRatingSchema);

module.exports = OpticianRating;
