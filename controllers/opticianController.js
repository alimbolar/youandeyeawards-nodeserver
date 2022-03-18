const opticianController = {};
const Optician = require("../models/opticianModel");
const fetch = require("node-fetch");

opticianController.addOptician = async function (req, res) {
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

opticianController.getAllOpticians = async function (req, res) {
  const opticians = await Optician.find();

  res.status(200).json({
    status: "success",
    data: opticians,
  });
};

opticianController.getOneOptician = async function (req, res) {
  const slug = req.params.slug;

  console.log(req.params);
  const optician = await Optician.find({ slug });

  res.status(200).json({
    status: "success",
    data: optician,
  });
};

opticianController.updateOneOptician = async function (req, res) {
  const slug = req.params.slug;

  const url = `https://youandeyemag.com/wp-json/wp/v2/optician?_fields=id,slug,toolset-meta.organisation-details,toolset-meta.optician-details,content.rendered,title.rendered&slug=${slug}`;

  const response = await fetch(url);
  const data = await response.json();

  const optician = createOpticianObject(data[0]);
  // console.log(optician);

  const updatedOptician = await Optician.findOneAndUpdate({ slug }, optician);

  res.status(200).json({
    status: "success",
    data: updatedOptician,
  });
};

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

// FUNCTION FOR USE IN ADD OPTICIAN

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

    const segment =
      +branches.length >= 5 && branches.some(checkForMetro)
        ? "Metro"
        : "Non-Metro";

    // console.log("metro", branches.some(checkForMetro));
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

  const segment =
    +branches.length >= 5 && branches.some(checkForMetro)
      ? "Metro"
      : "Non-Metro";

  console.log("metro", branches.some(checkForMetro));
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