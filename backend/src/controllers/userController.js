const { User } = require('../db')
module.exports = {
  signInUser: async (user) => {
    try {
      const existe = await User.findOne({ where: { email: user.email } });
      if (!existe) {
        const response = await User.create(user);
        return response;
      } else {
        return { exist: true };
      }
    } catch (error) {
      return error;
    }
  },
  logIn: async (user) => {
    console.log(user);
    try {
      const response = await User.findOne({ where: { email: user.email } });
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },
  reset: async (user) => {
    console.log(user);
    try {
      const response = await User.findOne({ where: { id: user.id } });
      console.log(response,"adw");
      if (response) {
        response.user_Name = user.name;
        response.email = user.email;
        await response.save();
        return response;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      return error;
    }
  },
};