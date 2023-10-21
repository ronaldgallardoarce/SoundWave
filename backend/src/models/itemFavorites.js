const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Items_Favorites',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:UUIDV4
        }
    })
}