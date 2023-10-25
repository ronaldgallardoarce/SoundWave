const { Track } = require("../db");
const addTrackController = async (track) => {
  console.log(track);
  try {
    const trackNew = await Track.create(track);
    console.log(trackNew);
    const allTracks = await Track.findAll();
    console.log(allTracks);

    return { update: allTracks, track: trackNew };
  } catch (error) {
    console.log(error);

    return error;
  }
};
module.exports = {
  addTrackController,
};
