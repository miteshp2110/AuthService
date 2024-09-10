const express=require('express')
const app=express()
const routes=require('./src/routes/authRoutes')
const sequelize = require('./config/database/db')


app.use(express.json())
app.use('/',routes)

sequelize.sync()
.then(()=>{
    console.log("Database Synced")
})
.catch(err=>{
    console.log("Error syncing Database: "+err)
})



app.listen(3000,()=>{
    console.log("Running on port 3000")
})