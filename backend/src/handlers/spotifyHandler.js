const { getAccessToken, refreshAccessToken, searchDataByType } = require("../services/spotifyService");
const respuesta = require("../utils/respuesta");

module.exports = {
    searchDataByType: async (req, res) => {
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
        const result = await searchDataByType(datos, token);
        respuesta(res, 200, result)
    },
}
