
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
            return true
        }
        else{
            return false
        }
    }
    catch(err){
        console.log("error: "+err)
        return false
    }

}

module.exports=checkIfExistingEmail