const Student = require('./models/Student')

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
        req.user = token
        const curr = await Student.findOne({rollno:token})
        if(curr.rollno!==token){
            return res.status(401).json({error:"Unauthorised User"})
        }
        return next()
    } catch (error) {
        res.status(401).json({error:"Authenicate"})
    }
}

module.exports=fetchuser