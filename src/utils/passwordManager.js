const bcrypt=require('bcrypt')
const env = require('dotenv')
env.config()
const saltRound= 10
async function encrypt(password){
    try{
        const hashedPassword=await bcrypt.hash(password,saltRound)
        
        return hashedPassword
    }
    catch(err){
        console.log("Error while encrypting: "+err)
    }

}

async function checkPassword(hashedPassword,password) {
    try{
        const isSame=await bcrypt.compare(password,hashedPassword)

    if(isSame){
        return true
    }
    else{
        return false
    }
    }

catch(err){
    console.log("Error in Decrypting: "+err)

}
}

module.exports={encrypt,checkPassword}