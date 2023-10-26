const { addTrackController, getTrackTop4, addTrackBySpotifyController, getAllTracksController } = require("../controllers/trackController");
const { getAccessToken } = require("../services/spotifyService");
const addTrackHandler = async (req, res) => {
  try {
    const track = req.body;
    const result = await addTrackController(track);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getHandlerTrackTop4 = async (req, res) => {
  try {
    const result = await getTrackTop4();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
}

const addTrackBySpotifyHandler = async (req, res) => {
  try {
    let token;
    if (global.accessToken && global.tokenExpiration && new Date() < global.tokenExpiration) {
      token = global.accessToken;
    } else {
      // if (global.accessToken && global.refreshToken) {
      //     token = await refreshAccessToken(global.refreshToken);
      // } else {
      // }
      token = await getAccessToken();
    }
    const datos = req.body;
    const result = await addTrackBySpotifyController(datos, token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

const getAllTracksHandler= async (req, res) => {
  try {
    const result = await getAllTracksController();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  addTrackHandler,
  getHandlerTrackTop4,
  addTrackBySpotifyHandler,
  getAllTracksHandler,
};