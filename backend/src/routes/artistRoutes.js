const express = require("express");
const {
  addArtistHanlder,
  getArtistHanlder,
} = require("../handlers/artistHandler");
const router = express();

router.get("/get", getArtistHanlder);
router.post("/register", addArtistHanlder);


module.exports = router;