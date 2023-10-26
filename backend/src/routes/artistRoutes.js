const express = require("express");
const {
  addArtistHanlder,
  getArtistHanlder,
  getArtistTop6Handler,
} = require("../handlers/artistHandler");
const router = express();

router.get("/get", getArtistHanlder);
router.post("/register", addArtistHanlder);
router.get('/top6',getArtistTop6Handler)


module.exports = router;