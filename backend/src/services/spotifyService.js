const { Track } = require("../db");
const axios = require('axios');
const qs = require('querystring');
const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = process.env

global.accessToken = null;
global.tokenExpiration = null;

module.exports = {
    getAccessToken: async () => {
        try {
            console.log('getAccessToken')
            const url = 'https://accounts.spotify.com/api/token';
            const data = {
                grant_type: 'client_credentials',
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET
            };

            const response = await axios.post(url, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            global.accessToken = response.data.access_token;
            global.tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000);
            return global.accessToken;
        } catch (error) {
            console.error(`Error: ${error}`);
            return 'Error al obtener el token de acceso';
        }
    },
    refreshAccessToken: async (refreshToken) => {
        try {
            const url = 'https://accounts.spotify.com/api/token';
            const data = {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET
            };

            const response = await axios.post(url, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            global.accessToken = response.data.access_token;
            global.tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000);
            return global.accessToken;
        } catch (error) {
            console.error(`Error: ${error}`);
            return 'Error al refrescar el token de acceso';
        }
    },
    searchDataByType: async (datos, token) => {
        try {
            const checkIfTrackExists = async (url) => {
                try {
                    const track = await Track.findOne({ where: { url: url } });
                    return track !== null;
                } catch (error) {
                    console.error(`Error: ${error}`);
                    return false;
                }
            }

            const url = 'https://api.spotify.com/v1/search';
            const params = {
                q: datos.search,
                type: datos.type
            };
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await axios.get(url, { params, headers });

            // Crear un array de promesas
            const trackExistsPromises = response.data.tracks.items.map(item => {
                if (item.preview_url !== null) {
                    return checkIfTrackExists(item.preview_url);
                }
                return Promise.resolve(false);
            });

            // Esperar a que todas las promesas se resuelvan
            const trackExistsResults = await Promise.all(trackExistsPromises);

            // Filtrar los elementos del array 'tracks.items' que no existen en la tabla 'Track'
            response.data.tracks.items = response.data.tracks.items.filter((item, index) => {
                if (item.preview_url !== null) {
                    return !trackExistsResults[index];
                }
                return false;
            });

            return response.data;
        } catch (error) {
            console.error(`Error: ${error}`);
            return 'Error al buscar datos';
        }
    },

    getArtistById: async (href, token) => {
        try {
            const url = href;
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await axios.get(url, { headers });
            return response.data
        } catch (error) {
            return error;
        }
    }

}
