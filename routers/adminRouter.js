const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

//ADMIN

router.get("/", viewController.showDashboard);

router.get("/results/:category", viewController.showResults);
router.get("/update-all-opticians", viewController.showUpdateOpticians);

module.exports = router;
