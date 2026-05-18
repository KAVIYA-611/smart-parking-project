const express = require("express");
const router = express.Router();

const mallsData = require("../data/dataset.json");

// Get all malls
router.get("/", (req, res) => {
  res.json(mallsData);
});

// Get malls by city
router.get("/:city", (req, res) => {
  const city = req.params.city.toLowerCase();

  if (mallsData[city]) {
    res.json(mallsData[city]);
  } else {
    res.status(404).json({
      message: "City not found",
    });
  }
});

module.exports = router;
