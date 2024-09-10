const jwt = require('jsonwebtoken')
const seceret='SampleSeceretKey'

function createJwtToken(email) {
    const token = jwt.sign({
        email: email
    },
    seceret,
    {
        expiresIn: '24h'
    }
    )   

    return token

}


const authenticateToken=((req,res)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1]
    

    if(!token){
        return res.sendStatus(401)
    }
    jwt.verify(token,seceret,(err,user)=>{
        if(err){
            if(err.name=="TokenExpiredError"){
                return res.status(403).json({"error":"TokenExpired"})
            }else{

                return res.status(403).json({"error":"Invalid Token"})
            }
        }
        return res.status(200).json({"reply":user})
    })
})


const refreshToken=(async (req,res)=>{
    const {token,email}=req.body

   const decodedToken=jwt.decode(token)

   if(decodedToken.email==email){
    jwt.verify(token,seceret,(err,user)=>{
        if(err){
            if(err.name=="TokenExpiredError"){
                const newToken= createJwtToken(decodedToken.email)
                return res.status(200).json({"token":newToken})
            }
        }
        return res.status(403).json({"error":"Invalid Token"})
    })
   }
   else{
    return res.status(403).json({"error":"Invalid Token"})
   }
   

})

module.exports={createJwtToken,authenticateToken,refreshToken}