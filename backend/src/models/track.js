const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Track', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        realase_Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        popularity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    })
}