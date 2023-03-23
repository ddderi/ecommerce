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
      console.log(id);
      const productRef = db.collection("products").doc(id);
      const response = await productRef.get();
      const product = response.data();
      return res.status(200).json({ product });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
