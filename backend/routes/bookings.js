const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: "Error saving booking" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching bookings" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = router;
