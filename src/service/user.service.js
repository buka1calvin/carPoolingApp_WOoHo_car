import User from "../models/user";
import { BcryptUtil } from "../utils/bcrypt"

export const registerUser=async(data)=>{
    const {firstname,lastname,email,role,phoneNumber,password,isActive}=data;
    const newUser=await User.create(
        {
            firstname,
            lastname,
            email,
            role,
            phoneNumber,
            password:await BcryptUtil.hash(password),
            isActive
        }
    )
    return newUser
}
