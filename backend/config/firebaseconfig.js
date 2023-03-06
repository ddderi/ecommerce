var admin = require("firebase-admin");

var serviceAccount = require("../firebase-auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// firebase.initializeApp(serviceAccount);
const adminAuth = admin.auth();

module.exports = adminAuth;
