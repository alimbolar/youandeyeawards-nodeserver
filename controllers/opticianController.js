const opticianController = {};
const Optician = require("../models/opticianModel");
const fetch = require("node-fetch");

// FUNCTION TO ADD ALL OPTICIANS BEFORE GO LIVE

// let opticianIdArray = [];

opticianController.addAllOpticians = async function (req, res) {
  try {
    // CREATE AN ARRAY OF IDS BASED ON EXISTING OPTICIANS IN DATABASE

    const query = Optician.find().select("opticianId");
    const opticianIds = await query;
    let opticianIdsArray = opticianIds.map((optician) => optician.opticianId);

    // console.log(opticianIdsArray);
    let total = 0;

    // GET JSON FROM WORDPRESS

    const url = `https://youandeyemag.com/wp-json/wp/v2/optician?_fields=id,slug,toolset-meta.organisation-details,toolset-meta.optician-details,content.rendered,title.rendered&per_page=50&page=`;

    let page = "1";
    let status = true;

    while (status === true) {
      // while (page <= 3) {
      let newURL = url + page;
      console.log(newURL);
      const response = await fetch(newURL);
      const data = await response.json();

      if (response.status === 200) {
        total = await createOpticiansInMongo(data, opticianIdsArray, total);

        page++;
      } else {
        status = false;
      }
    }

    // console.log("total opticians added", total);

    res.status(200).json({
      status: "success",
      message: `${total} opticians Added`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

// GET ALL OPTICIANS (PENDING : SORT AND FILTER)

opticianController.getAllOpticians = async function (req, res) {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /b(gte)|(gt)|(lte)|(lt)b/,
      (match) => `$${match}`
    );

    let query = Optician.find(JSON.parse(queryStr));

    // SORTING

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("name");
    }

    // SELECT FIELDS

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    // PAGINATION

    const page = req.query.page || 1;
    const limit = req.query.limit || 1000;
    // Logic applied is that records from previous page (page-1) need to be skipped
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const numOfRecords = await Optician.countDocuments();
    if (req.query.page) {
      if (skip >= numOfRecords) throw new Error("No more records");
    }

    const opticians = await query;

    res.status(200).json({
      status: "success",
      count: opticians.length,
      total: numOfRecords,
      data: opticians,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      // count: opticians.length,
      // total: numOfRecords,
      data: error.message,
    });
  }
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
  try {
    const slug = req.params.slug;

    const optician = await Optician.find({ slug });

    res.status(200).json({
      status: "success",
      data: optician,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// UPDATE ONE OPTICIAN

opticianController.updateOneOptician = async function (req, res) {
  const opticianId = req.params.opticianId;
  console.log(opticianId);

  const url = `https://youandeyemag.com/wp-json/wp/v2/optician/${opticianId}/?_fields=id,slug,toolset-meta.organisation-details,toolset-meta.optician-details,content.rendered,title.rendered`;

  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);
  const optician = updateOpticianObject(data);

  const updatedOptician = await Optician.findOneAndUpdate(
    { opticianId },
    optician
  );
  // console.log(updatedOptician);
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

const createOpticiansInMongo = async function (data, opticianIdsArray, total) {
  let count = 0;
  data.forEach((item) => {
    // Check IF optician does not exist in Mongo DB
    if (!opticianIdsArray.includes(item.id.toString())) {
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
      const country =
        item["toolset-meta"]["optician-details"]["optician-store"].raw;
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
        country,
      };

      Optician.create(opticianObject);
      count++;
    } // End of IF condition to check if does not optician exist in Mongo
  });

  total += count;

  // console.log(`${total} opticians added`);

  return total;
};

// FUNCTION TO UPDATE OPTICIAN OBJECT

const updateOpticianObject = function (item) {
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
  const country =
    item["toolset-meta"]["optician-details"]["optician-store"].raw;
  return {
    // opticianId,
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
    country,
  };
};

module.exports = opticianController;
