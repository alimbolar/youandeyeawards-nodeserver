const express = require("express");
const router = express.Router();
// const messageController = require("../controllers/messageController");
const ratingController = require("../controllers/ratingContoller");

// router.get("/message", messageController.saveMessage);

router.get("/opticianRating", ratingController.opticianRating);
router.post("/addOpticianRating", ratingController.addOpticianRating);

module.exports = router;
