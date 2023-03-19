var admin = require("firebase-admin");
const firebase = require("firebase");

var serviceAccount = require("../firebase-auth.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firebaseConfig = {
  apiKey: "AIzaSyB8cnBOtGoIcUjwiEGw8eF9fo9QQRe6P80",
  authDomain: "shopping-cart-139ad.firebaseapp.com",
  projectId: "shopping-cart-139ad",
  storageBucket: "shopping-cart-139ad.appspot.com",
  messagingSenderId: "225927177199",
  appId: "1:225927177199:web:3873070a1623cbd9510c1a",
  measurementId: "G-RZP110LF0F",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
// firebase.initializeApp(serviceAccount);
const adminAuth = admin.auth();

module.exports = { adminAuth: adminAuth, db: db };
