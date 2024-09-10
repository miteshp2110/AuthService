const user =require('../models/userModel')

const userSignUp=((req,res)=>{
    const uname='mitesh2110'
    const email='mitesh2110@gmail.com'
    const password='Mi12te34'
    try{
        const newUser=user.create({
            uname,
            email,
            password

        })
        res.status(201).json(newUser)
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
    //res.send('create User Called')

})


module.exports=userSignUp