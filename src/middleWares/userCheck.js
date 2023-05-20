import User from "../models/user";

const userExist=async(req,res,next)=>{
    const exists=await User.findOne({email:req.body.email})
    req.User=exists;
    if(exists){
        console.log(exists)
        return res.status(400).json({status:false,message:'email already exist!'})
    }
    next();
}
export default userExist;