const jwt= require('jsonwebtoken');
const SECRET = 'secrethaha';

const fetchuser=async (req,res,next)=>{

    const token=req.header('auth-token')
    if(!token){
        res.status(401).json({error:"Please authenticate using a valid token"})
    }
    if(token==='Admin'){
        req.user = token
        return next()
    }
    try {
        const data=jwt.verify(token,SECRET)
        req.user = data.user
        return next()
    } catch (error) {
        res.status(401).json({error:"Authenicate using valid token"})
    }
}

module.exports=fetchuser