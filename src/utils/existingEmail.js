
const { where } = require('sequelize')

const user = require('../models/userModel')

async function checkIfExistingEmail(email){

    try{
        const existingUser = await user.findOne({
            where:{
                email: email
            }
        })

        if(existingUser){
            return existingUser
        }
        else{
            return null
        }
    }
    catch(err){
        console.log("error: "+err)
        return null
    }

}

module.exports=checkIfExistingEmail