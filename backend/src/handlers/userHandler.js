const { signInUser } = require("../controllers/userController");
const respuesta = require("../utils/respuesta");

module.exports = {
    signInUser: async (req, res) => {
        const user = req.body;
        const response = await signInUser(user);
        respuesta(res, 200, response)
    }
}