const express = require("express");
const router = express.Router();
const firebaseController = require("../app/controllers/firebaseController");
const productController = require("../app/controllers/productController");
const userController = require("../app/controllers/userController");
const cartController = require("../app/controllers/cartController");
const auth = require("../app/controllers/auth");
require("dotenv").config();

router.post("/verification-email", firebaseController.sendVerificationEmail);
router.post("/signup", firebaseController.signupUser);

router.post("/user_info", userController.createUserAdress);

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);

router.post("/addCart", auth, cartController.addCart);

router.get("/cart/:id", auth, cartController.fetchCart);

router.get("/test", async (req, res) => {
  console.log(req.headers);
  return res.json({ message: "its working" });
});

module.exports = router;
