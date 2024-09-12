const user =require('../models/userModel')
const { createJwtToken } = require('../services/jwtService')
const checkIfExistingEmail  = require('../utils/existingEmail')
const {encrypt} = require('../utils/passwordManager')


const userSignUp=(async (req,res)=>{
    try{
        
        const {email}=req.body
        const password=await encrypt(req.body.password)
        
        if( ! await checkIfExistingEmail(email)){
            const newUser=await user.create({
                uname: req.body.username,
                email,
                password
    
            })
            token=createJwtToken(email)
            res.status(201).json({"token":token})   
        }else{
            res.status(409).json({error:"Email Already Exist"})
        }
    }
    catch (err){
        res.status(400).json({error: err.message})
    }
    

})


module.exports=userSignUp