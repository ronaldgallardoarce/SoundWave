const { Track, Artist } = require("../db");
const { getArtistById } = require("../services/spotifyService");
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

const addTrackBySpotifyController = async (data, token) => {
  try {
    const response = await getArtistById(data.artistHref, token);
    const artist = {
      name: response.name,
      images: [response.images[0].url, response.images[1].url, response.images[2].url],
      followers: response.followers.total,
      genres: response.genres,
      popularity: response.popularity
    }
    const newArtist = await Artist.create(artist)
    data.newTrack.ArtistId = newArtist.id
    const trackNew = await Track.create(data.newTrack);
    const allTracks = await Track.findAll();

    return { update: allTracks, track: trackNew };
  } catch (error) {
    console.log(error);

    return error;
  }
};

const getTrackTop4 = async () => {
  try {
    const top4 = await Track.findAll({
      limit: 4,
      order: [['popularity', 'DESC']]
    });
    return top4
  } catch (error) {
    return error;
  }
}

const getAllTracksController = async () => {
  try {
    const response = await Track.findAll({
      include: [{
        model: Artist
      }]
    });
    return response
  } catch (error) {
    return error;
  }
}
module.exports = {
  addTrackController,
  getTrackTop4,
  addTrackBySpotifyController,
  getAllTracksController,
};
