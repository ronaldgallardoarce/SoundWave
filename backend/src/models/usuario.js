const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Usuario',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:UUIDV4
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}