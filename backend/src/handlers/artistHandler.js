const {addArtist,getArtist}=require('../controllers/artistController');
const addArtistHanlder = async(req,res) => {
    try {
        const artist=req.body;
        const result = await addArtist(artist);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json(error);
    }
}
const getArtistHanlder = async (req, res) => {
  try {
    const result = await getArtist();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
};
module.exports = {
  addArtistHanlder,
  getArtistHanlder,
};