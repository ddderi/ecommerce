const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("../app/router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/v1", router);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
