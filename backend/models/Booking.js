const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mallId: String,
  mallName: String,
  slotId: String,
  floor: String,
  vehicleNumber: String,
  userName: String,
  entryTime: String,
  duration: Number,
  status: { type: String, default: "active" },
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
