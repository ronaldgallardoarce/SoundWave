const { signInUser, logIn, reset } = require("../controllers/userController");
const respuesta = require("../utils/respuesta");

module.exports = {
  signInUser: async (req, res) => {
    const user = req.body;
    const response = await signInUser(user);
    respuesta(res, 200, response);
  },
  logIn: async (req, res) => {
    const user = req.body;
    const response = await logIn(user);
    respuesta(res, 200, response);
  },
  reset:async (req,res) => {
    const user = req.body;
    const response = await reset(user);
    respuesta(res,200,response);
  }

};