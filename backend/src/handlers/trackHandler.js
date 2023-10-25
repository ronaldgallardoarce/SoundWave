const { addTrackController } = require("../controllers/trackController");
const addTrackHandler = async (req, res) => {
  try {
    const track = req.body;
    const result = await addTrackController(track);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};
 
module.exports = {
  addTrackHandler,
};