const user = require('../models/userModel')
const { createJwtToken } = require('../services/jwtService')
const checkIfExistingEmail = require('../utils/existingEmail')
const {checkPassword} = require('../utils/passwordManager')

const userLogin = (async (req,res)=>{
    try{
        const {email,password}= req.body
        const existingUser= await checkIfExistingEmail(email)
        if (existingUser){
            
            const isPasswordCorrect=await checkPassword(existingUser.password,password)
            if(isPasswordCorrect){
                const token = createJwtToken(email)
                res.status(200).json({
                    "message":"Correct Credentials",
                    "token" : token,
                    "username" : existingUser.uname
                    
                })
            }else{
                res.status(401).json({"message":"wrong password"})
            }
        }else{
            res.status(404).json({'error':"Email does not exist"})
        }
    }
    catch(err){
        res.status(400).json({"error":err})
    }
})


module.exports=userLogin