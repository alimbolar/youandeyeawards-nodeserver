const express = require("express");
const router = express.Router();

// const messageController = require("../controllers/messageController");
const ratingController = require("../controllers/ratingContoller");
const opticianController = require("../controllers/opticianController");

// router.get("/message", messageController.saveMessage);

// ALL OPTICIANS
//
router.get("/addAllOpticians", opticianController.addAllOpticians);
//
router.get("/getAllOpticians", opticianController.getAllOpticians);
router.post("createOneOptician", opticianController.createOneOptician);
router.get("/getOneOptician/:slug", opticianController.getOneOptician);
router.put("/updateOneOptician/:slug", opticianController.updateOneOptician);

// RATING
router.get("/getAllRatings", ratingController.getAllRatings);
router.post("/createOneRating", ratingController.createOneRating);

module.exports = router;
