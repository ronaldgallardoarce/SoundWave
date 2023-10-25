const express = require("express");
const { addTrackHandler } = require("../handlers/trackHandler");
const router = express();
 
router.post("/add", addTrackHandler);

module.exports = router;
