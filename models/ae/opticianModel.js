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
    default:
      "https://youandeyemag.com/wp-content/uploads/sites/4/2020/08/ye-placeholder-logo-for-opticians.jpg",
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
  website: {
    type: String,
  },
  promotionVideo: {
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
  country: {
    type: String,
  },
  mainImage:{
    type:String,
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
    default: 0,
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
  sqAverage: {
    type: Number,
    default: 0,
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
  ceAverage: {
    type: Number,
    default: 0,
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
  osAverage: {
    type: Number,
    default: 0,
    max: [5, "Rating must be 5 or below"],
    select: false,
  },
});

opticianSchema.index({ category: 1, segment: 1 });

const AEOptician = mongoose.model("AEOptician", opticianSchema);

module.exports = AEOptician;
