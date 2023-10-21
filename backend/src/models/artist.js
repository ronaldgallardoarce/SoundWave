const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Artist', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
        followers: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        genres: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        popularity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
}