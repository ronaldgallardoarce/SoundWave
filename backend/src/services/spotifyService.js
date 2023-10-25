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
            const url = 'https://api.spotify.com/v1/search';
            const params = {
                q: datos.search,
                type: datos.type
            };
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await axios.get(url, { params, headers })
            return response.data;
        } catch (error) {
            console.error(`Error: ${error}`);
            return 'Error al buscar datos';
        }
    }
}
