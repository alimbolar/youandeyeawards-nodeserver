const viewController = {};
const { resolveSoa } = require("dns");
const url = require("url");
const fetch = require("node-fetch");

viewController.showHome = function (req, res) {
  res.render("home");
};

viewController.showContact = function (req, res) {
  res.render("contact");
};

viewController.showShop = function (req, res) {
  fetch("https://www.rkumar.in/wp-json/wc/store/products")
    .then((response) => response.json())
    .then((data) => {
      res.render("shop", { products: data });
    });
};

module.exports = viewController;
