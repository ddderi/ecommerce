const db = require("../../config/firebaseconfig").db;

const productController = {
  getProducts: async function (req, res) {
    try {
      const productRef = db.collection("products");
      const response = await productRef.get();
      const products = [];
      response.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id; // Add the ID field to the product object
        products.push(product);
      });

      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async function (req, res) {
    try {
      const { id } = req.params;

      const productRef = db.collection("products").doc(id);
      const response = await productRef.get();

      if (!response.exists) {
        return res
          .status(404)
          .json({ message: "Product not found", productExists: false });
      }

      const productData = response.data();
      if (!productData) {
        return res
          .status(404)
          .json({ message: "Product data not found", productExists: false });
      }

      const product = { ...productData, id: id };
      return res.status(200).json({ product, productExists: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = productController;
