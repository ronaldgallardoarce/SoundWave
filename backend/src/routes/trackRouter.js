const express = require("express");
const { addTrackHandler, getHandlerTrackTop4, addTrackBySpotifyHandler, getAllTracksHandler } = require("../handlers/trackHandler");
const router = express();
 
router.post("/addBySpotify", addTrackBySpotifyHandler);
router.post("/add", addTrackHandler);
router.get("/top4", getHandlerTrackTop4);
router.get('/',getAllTracksHandler)

module.exports = router;
