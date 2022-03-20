const mongoose = require("mongoose");

const opticianSchema = new mongoose.Schema({
  opticianId: {
    type: String,
    required: [true, "Optician Id is required"],
    unique: true,
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Optician Name is required"],
  },
  profile: {
    type: String,
    default: "No profile provided",
  },
  phone: {
    type: String,
    default: "Mobile not provided",
  },
  email: {
    type: String,
    default: "Email ID not provided",
  },
  logoUrl: {
    type: String,
    required: [true, "Logo URL is required"],
  },
  headOffice: {
    type: String,
  },
  branches: {
    type: Array,
    required: [true, "Branch Office is required"],
  },
  yearOfIncorporation: {
    type: String,
  },
  lensesDispensed: {
    type: String,
  },
  brandsStocked: {
    type: String,
  },
  servicesOffered: {
    type: String,
  },
  stores: {
    type: String,
  },
  storeImages: {
    type: Array,
  },
  bannerImages: {
    type: Array,
  },
  category: {
    type: String,
  },
  segment: {
    type: String,
  },
  nRatings: {
    type: Number,
    default: 0,
    select: false,
  },
  ecAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be 1 or above"],
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
  sqAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be 1 or above"],
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
  ceAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be 1 or above"],
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
  osAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be 1 or above"],
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
});

opticianSchema.index({ category: 1, segment: 1 });

const Optician = mongoose.model("optician", opticianSchema);

module.exports = Optician;
