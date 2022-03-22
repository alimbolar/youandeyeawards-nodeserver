const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

//ADMIN

router.get("/", viewController.showDashboard);

router.get("/results/:category", viewController.showResults);

module.exports = router;
