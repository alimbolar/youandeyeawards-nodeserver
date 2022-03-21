const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

//ADMIN

router.get("/:category", viewController.showResults);

module.exports = router;
