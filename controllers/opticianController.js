const opticianController = {};
const Optician = require("../models/opticianModel");
const fetch = require("node-fetch");

// FUNCTION TO ADD ALL OPTICIANS BEFORE GO LIVE

opticianController.addAllOpticians = async function (req, res) {
  const url = `https://youandeyemag.com/wp-json/wp/v2/optician?_fields=id,slug,toolset-meta.organisation-details,toolset-meta.optician-details,content.rendered,title.rendered&per_page=100&page=`;

  let page = "1";
  let status = true;

  while (status === true) {
    // while (page <= 1) {
    let newURL = url + page;
    console.log(newURL);
    const response = await fetch(newURL);
    const data = await response.json();

    if (response.status === 200) {
      createOpticiansInMongo(data);
      page++;
    } else {
      status = false;
    }
  }

  res.status(200).json({
    status: "success",
  });
};

// GET ALL OPTICIANS (PENDING : SORT AND FILTER)

opticianController.getAllOpticians = async function (req, res) {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((field) => delete queryObj[field]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(
    /b(gte)|(gt)|(lte)|(lt)b/,
    (match) => `$${match}`
  );

  let query = Optician.find(JSON.parse(queryStr));

  console.log(queryObj);
  console.log(JSON.parse(queryStr));
  // console.log("query", query);

  // SORTING

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort("name");
  }

  const opticians = await query;

  res.status(200).json({
    status: "success",
    count: opticians.length,
    data: opticians,
  });
};

// CREATE ONE OPTICIAN

opticianController.createOneOptician = async function (req, res) {
  const optician = await Optician.create(req.body);

  res.status(200).json({
    status: "success",
    data: optician,
  });
};

// GET ONE OPTICIAN (PENDING FILTER)

opticianController.getOneOptician = async function (req, res) {
  const slug = req.params.slug;

  const optician = await Optician.find({ slug });

  res.status(200).json({
    status: "success",
    data: optician,
  });
};

// UPDATE ONE OPTICIAN

opticianController.updateOneOptician = async function (req, res) {
  const slug = req.params.slug;

  const url = `https://youandeyemag.com/wp-json/wp/v2/optician?_fields=id,slug,toolset-meta.organisation-details,toolset-meta.optician-details,content.rendered,title.rendered&slug=${slug}`;

  const response = await fetch(url);
  const data = await response.json();

  const optician = createOpticianObject(data[0]);

  const updatedOptician = await Optician.findOneAndUpdate({ slug }, optician);

  res.status(200).json({
    status: "success",
    data: updatedOptician,
  });
};

// FUNCTION TO CHECK IF SEGMENT IS METRO OR NON-METRO

const checkForMetro = function (branch) {
  const metros = [
    "ahmedabad",
    "bangalore",
    "chennai",
    "delhi",
    "hyderabad",
    "kolkata",
    "kolkatta",
    "mumbai",
    "pune",
  ];
  return metros.some((metro) => {
    const pattern = new RegExp(metro, "i");
    return pattern.test(branch);
  });
};

// FUNCTION FOR USE IN ADD ALL OPTICIAN BEFORE GO LIVE

const createOpticiansInMongo = async function (data) {
  // const opticianObject = createObject(data);
  data.forEach((item) => {
    const opticianId = item.id;
    const slug = item.slug;
    const name = item.title.rendered;
    const profile = item.content.rendered;
    const logoUrl =
      item["toolset-meta"]["organisation-details"]["organisation-logo"].raw;
    const phone =
      item["toolset-meta"]["organisation-details"]["organisation-phone"].raw;
    const email =
      item["toolset-meta"]["organisation-details"]["organisation-email"].raw;
    const headOffice =
      item["toolset-meta"]["organisation-details"]["head-office"].raw;
    const branches =
      item["toolset-meta"]["organisation-details"]["branch-office"].raw;

    const stores = branches.length;

    const category =
      branches && +branches.length >= 5 ? "Retail Chain" : "Boutique Stores";

    let segment = "";
    if (+branches.length <= 5) {
      segment = branches.some(checkForMetro) ? "Metro" : "Non-Metro";
    }

    const yearOfIncorporation =
      item["toolset-meta"]["optician-details"]["year-of-incorporation"].raw;

    const lensesDispensed =
      item["toolset-meta"]["optician-details"]["lenses-dispensed"].raw;
    const brandsStocked =
      item["toolset-meta"]["optician-details"]["brands-stocked"].raw;
    const servicesOffered =
      item["toolset-meta"]["optician-details"]["services-offered"].raw;
    const storeImages =
      item["toolset-meta"]["optician-details"]["optician-store-image"].raw;
    const bannerImages =
      item["toolset-meta"]["organisation-details"]["organisation-banner"].raw;
    const opticianObject = {
      opticianId,
      slug,
      name,
      profile,
      logoUrl,
      phone,
      email,
      headOffice,
      branches,
      stores,
      category,
      segment,
      yearOfIncorporation,
      lensesDispensed,
      brandsStocked,
      servicesOffered,
      storeImages,
      bannerImages,
    };

    Optician.create(opticianObject);
  });
};

// FUNCTION TO CREATE OPTICIAN OBJECT FROM REQ.BODY

const createOpticianObject = function (item) {
  const opticianId = item.id;
  const slug = item.slug;
  const name = item.title.rendered;
  const profile = item.content.rendered;
  const logoUrl =
    item["toolset-meta"]["organisation-details"]["organisation-logo"].raw;
  const phone =
    item["toolset-meta"]["organisation-details"]["organisation-phone"].raw;
  const email =
    item["toolset-meta"]["organisation-details"]["organisation-email"].raw;
  const headOffice =
    item["toolset-meta"]["organisation-details"]["head-office"].raw;
  const branches =
    item["toolset-meta"]["organisation-details"]["branch-office"].raw;

  const stores = branches.length;

  const category =
    branches && +branches.length >= 5 ? "Retail Chain" : "Boutique Stores";

  let segment = "";
  if (+branches.length <= 5) {
    segment = branches.some(checkForMetro) ? "Metro" : "Non-Metro";
  }

  const yearOfIncorporation =
    item["toolset-meta"]["optician-details"]["year-of-incorporation"].raw;

  const lensesDispensed =
    item["toolset-meta"]["optician-details"]["lenses-dispensed"].raw;
  const brandsStocked =
    item["toolset-meta"]["optician-details"]["brands-stocked"].raw;
  const servicesOffered =
    item["toolset-meta"]["optician-details"]["services-offered"].raw;
  const storeImages =
    item["toolset-meta"]["optician-details"]["optician-store-image"].raw;
  const bannerImages =
    item["toolset-meta"]["organisation-details"]["organisation-banner"].raw;
  return {
    opticianId,
    slug,
    name,
    profile,
    logoUrl,
    phone,
    email,
    headOffice,
    branches,
    stores,
    category,
    segment,
    yearOfIncorporation,
    lensesDispensed,
    brandsStocked,
    servicesOffered,
    storeImages,
    bannerImages,
  };
};

module.exports = opticianController;
