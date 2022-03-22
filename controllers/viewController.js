const viewController = {};
const Optician = require("./../models/opticianModel");

viewController.showDashboard = function (req, res, next) {
  res.status(200).render("dashboard");
};

viewController.showUpdateOpticians = function (req, res, next) {
  res.status(200).render("update-all-opticians");
};

viewController.showResults = async function (req, res, next) {
  const category = req.params.category;
  let segment;
  let categorySegment;

  if (category === "metro") {
    segment = "Metro";
    categorySegment = "Boutique Stores : Metro";
  }
  if (category === "non-metro") {
    segment = "Non-Metro";
    categorySegment = "Boutique Stores : Non Metro";
  }
  if (category === "retail-chains") {
    segment = "";
    categorySegment = "Retail Chains : All India";
  }

  const query = Optician.find({ segment, country: "in" })
    .select(
      "opticianId logoUrl name nRatings ecAverage sqAverage ceAverage osAverage lensesDispensed brandsStocked servicesOffered stores category segment"
    )
    .sort("-nRatings name");

  const opticians = await query;

  res.status(200).render("results", {
    status: "success",
    categorySegment,
    count: opticians.length,
    opticians,
  });
};

module.exports = viewController;
