const { adminAuth } = require("../../config/firebaseconfig");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }
  const token = authHeader.split(" ")[1];

  // Verify the token using the Firebase Admin SDK
  //   admin.auth().verifyIdToken(token)
  adminAuth
    .verifyIdToken(token)
    .then((decodedToken) => {
      // If the token is valid, set the decoded user ID on the request object
      req.userId = decodedToken.uid;
      next();
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      return res.status(401).send("Unauthorized");
    });
};
