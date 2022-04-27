const express = require("express");
const router = express.Router();

// const messageController = require("../controllers/messageController");
const ratingController = require("../controllers/ratingContoller");
const opticianController = require("../controllers/opticianController");

// router.get("/message", messageController.saveMessage);

// ALL OPTICIANS BEFORE GO LIVE
router.get("/addAllOpticians", opticianController.addAllOpticians);

// OPTICIANS
router.get("/getAllOpticians", opticianController.getAllOpticians);
router.post("createOneOptician", opticianController.createOneOptician);
router.get("/getOneOptician/:slug", opticianController.getOneOptician);
router.put(
  "/updateOneOptician/:opticianId",
  opticianController.updateOneOptician
);

// RATING
router.get("/getAllRatings", ratingController.getAllRatings);
router.post("/createOneRating", ratingController.createOneRating);
router.put("/updateOneRating", ratingController.updateOneRating);
router.put("/deleteOneRating", ratingController.deleteOneRating);

module.exports = router;
