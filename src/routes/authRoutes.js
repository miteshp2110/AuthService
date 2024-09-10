const express=require('express')
const routes=express.Router()
const userSignUp=require('../controllers/signUp')
const { authenticateToken, refreshToken } = require('../services/jwtService')
const userLogin = require('../controllers/login')


// '/createUser'
routes.route('/signup').post(userSignUp)
routes.route('/verifyToken').get(authenticateToken)
routes.route('/login').post(userLogin)
routes.route('/refreshToken').post(refreshToken)


module.exports=routes