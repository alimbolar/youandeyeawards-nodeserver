const express = require("express");
const router = express.Router();

// const messageController = require("../controllers/messageController");
const ratingController = require("../controllers/ratingContoller");
const opticianController = require("../controllers/opticianController");

// router.get("/message", messageController.saveMessage);

// ALL OPTICIANS

router.get("/addOptician", opticianController.addOptician);
router.get("/getAllOpticians", opticianController.getAllOpticians);
router.get("/getOneOptician/:slug", opticianController.getOneOptician);
router.put("/updateOneOptician/:slug", opticianController.updateOneOptician);

// RATING
router.post("/addOpticianRating", ratingController.addOpticianRating);

router.get("/opticianRating", ratingController.opticianRating);

module.exports = router;
