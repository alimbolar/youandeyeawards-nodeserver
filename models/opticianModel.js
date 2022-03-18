const mongoose = require("mongoose");

const opticianSchema = new mongoose.Schema({
  opticianId: {
    type: String,
    required: [true, "Optician Id is required"],
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
  serviceOffered: {
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
});

const Optician = mongoose.model("optician", opticianSchema);

module.exports = Optician;
