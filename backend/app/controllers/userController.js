const { adminAuth } = require("../../config/firebaseconfig");

const db = require("../../config/firebaseconfig").db;

const userController = {
  createUserAdress: async function (req, res) {
    try {
      const adressRef = db.collection("users").doc();
      const userAdress = {
        userId: "QVEqqOGg9fam7X0TN6K6DMdwWqq1",
        adress1: "18 manning street",
        adress2: "",
        city: "Brisbane",
        country: "Australia",
      };
      await adressRef.set(userAdress);
      console.log(adressRef);
      return adressRef;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
