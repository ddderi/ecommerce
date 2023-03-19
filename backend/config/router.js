const express = require("express");
const router = express.Router();
const firebaseController = require("../app/controllers/firebaseController");
const productController = require("../app/controllers/productController");
const userController = require("../app/controllers/userController");
require("dotenv").config();

router.post("/verification-email", firebaseController.sendVerificationEmail);
router.post("/signup", firebaseController.signupUser);

router.post("/user_info", userController.createUserAdress);

router.get("/products", productController.getProducts);

router.get("/test", async (req, res) => {
  return res.json({ message: "its working" });
});

module.exports = router;
