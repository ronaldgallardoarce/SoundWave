const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Favorites', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        }
    })
}