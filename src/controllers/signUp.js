const user =require('../models/userModel')
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
            res.status(201).json(newUser)
        }else{
            res.status(501).json({error:"Email Already Exist"})
        }
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
    

})


module.exports=userSignUp