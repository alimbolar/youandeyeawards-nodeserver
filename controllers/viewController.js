const viewController = {};
const Optician = require("./../models/opticianModel");

viewController.showResults = async function (req, res, next) {
  const category = req.params.category;
  let segment;

  if (category === "metro") segment = "Metro";
  if (category === "non-metro") segment = "Non-Metro";
  if (category === "retail-chains") segment = "";

  const query = Optician.find({ segment, country: "in" })
    .select(
      "logoUrl name nRatings ecAverage sqAverage ceAverage osAverage lensesDispensed brandsStocked servicesOffered stores category segment"
    )
    .sort("-nRatings");

  const data = await query;
  res.status(200).json({ status: "success", count: data.length, data });
};

module.exports = viewController;
