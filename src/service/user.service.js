import User from "../models/user";
import { BcryptUtil } from "../utils/bcrypt"
import Blacklist from "../models/blacklist";

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

export const findUserById=async(id)=>{
    const user=await User.findById({_id:id})
    if(user){
        return user;
    }
    else{
        return false;
    }
}
export const findUserByEmail = async (email) => {
    const UserInfo = await User.findOne({ email });
  
    if (UserInfo == null) {
      return false;
    }
    return UserInfo;
  };
export const logout = async (userData) => {
    const token = userData.split(' ')[1];
    await Blacklist.create({ token });
  };