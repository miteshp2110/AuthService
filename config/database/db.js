const e = require('express')
const {Sequelize} = require('sequelize')

const sequelize=new Sequelize(
    'auth',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("Database Connected")
}).catch(err=>{
    console.log("Error at Connection: "+err)
})

module.exports=sequelize