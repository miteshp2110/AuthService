const env= require('dotenv')

env.config()
const {Sequelize} = require('sequelize')

const sequelize=new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
        port: process.env.MYSQL_PORT,
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