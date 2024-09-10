const express=require('express')
const routes=express.Router()
const userSignUp=require('../controllers/signUp')


// '/createUser'
routes.route('/createUser').get(userSignUp)


module.exports=routes