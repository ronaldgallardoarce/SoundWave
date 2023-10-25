const { User } = require('../db')
module.exports = {
    signInUser: async (user) => {
        try {
            const response = await User.create(user)
            return response
        } catch (error) {
            return error;
        }
    }
}