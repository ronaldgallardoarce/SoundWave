const { Artist } = require("../db");
const addArtist = async(artist) => {
    console.log(artist);
    try {
        const artistNew = await Artist.create(artist);
        const allArtists = await Artist.findAll();
        return {update:allArtists,artist:artistNew};
    } catch (error) {
        return error;
    }
};
const getArtist = async () => {
  try {
    const allArtists = await Artist.findAll(); 
    return allArtists;
  } catch (error) {
    return error;
  }
};

const getArtistTop6 = async () => {
  try {
    const top6 = await Artist.findAll({
      limit: 6,
      order: [['followers', 'DESC']]
    });
    return top6
  } catch (error) {
    return error;
  }
}
module.exports = {
  addArtist,
  getArtist,
  getArtistTop6,
};
