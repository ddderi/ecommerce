const express = require("express");
const router = express.Router();
const firebaseController = require("./controllers/firebaseController");
require("dotenv").config();

router.post("/verification-email", firebaseController.sendVerificationEmail);
router.post("/signup", firebaseController.signupUser);

module.exports = router;
