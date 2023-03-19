const db = require("../../config/firebaseconfig").db;

const productController = {
  getProducts: async function (req, res) {
    try {
      const productRef = db.collection("products");
      const response = await productRef.get();
      const products = [];
      response.forEach((doc) => {
        products.push(doc.data());
      });
      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
