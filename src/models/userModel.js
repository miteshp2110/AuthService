const {DataTypes, Model} = require('sequelize')
const sequelize=require('../../config/database/db')

const user=sequelize.define('user',{
    
    uname:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'users',
    timestamps: false,
    freezeTableName: true
    

}
)
user.removeAttribute('id')

module.exports= user