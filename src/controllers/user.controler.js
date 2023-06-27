import User from "../models/user";
import { registerUser } from "../service/user.service";
import { BcryptUtil } from "../utils/bcrypt";
import { generateToken } from "../utils/generateToken";


export const createUser=async(req,res)=>{
    try{
    const {firstname,lastname,email,role,phoneNumber,password,isActive}=req.body;
    const userData={
        firstname,
        lastname,
        email,
        role,
        phoneNumber,
        password,
        isActive
    }
    const response=await registerUser(userData)
    const token=generateToken(userData,{expiresIn:'10min'})
    return res.status(201).json({
        user:response,
        token:token
    })
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

export const loginUser=async(req,res,next)=>{

          try{
            const foundUser=await User.findOne({email:req.body.email})
            if(!foundUser){
               return res.status(400).json({error:"user don't exist!"})
            }
            const passwordMaches=await BcryptUtil.compare(req.body.password,foundUser.password)
            if(!passwordMaches){
               return res.status(400).json({error:"passwords don't match!"})
            }
            const userToken={
                id:foundUser.id,
                firstname:foundUser.firstname,
                email:foundUser.email,
                role:foundUser.role,
                isactive:foundUser.isActive
            }
            const token=generateToken(userToken)
            if(foundUser.role==='passenger'||foundUser.role==="admin"){
                res.status(200).json({
                    message:"user logged in successfully!",
                    user:{
                        id:foundUser.id,
                        firstname:foundUser.firstname,
                        email:foundUser.email,
                        role:foundUser.role,
                        isactive:foundUser.isActive
                    },
                    token:token
                })
            }
          }
          catch(error){
            return res.status(500).json({error:error.message})
          }
}
