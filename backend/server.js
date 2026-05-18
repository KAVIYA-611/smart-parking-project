const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/smartparking")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/malls", require("./routes/malls"));
app.use("/api/bookings", require("./routes/bookings"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
