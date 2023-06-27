import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
 
const userSchema=new mongoose.Schema({
  
     firstname: {
        type: String,
        required: true
      },
     lastname: {
        type: String,
        required: true
     }
    ,
      email: {
        type: String,
        required: true,
        unique: true
      },
      role:{
        type:String,
        default:'passenger'
      },
      password: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      gender:{
        type:String,
      },
      profilePic: {
        type: String,
        default: 'default.jpg'
      },
      location: {
        type: String
      },
      isActive:{
        type:Boolean,
        default:true
      },
      bio: {
        type: String
      },
      isEmailVerified: {
        type:Boolean,
        default:false
      },
      provider: {
        type: String,
        default: ''
      },
      rating: {
        type: Number,
        default: 0
      },
      car: {
        make: String,
        model: String,
        year: Number,
        licensePlate: String
      },
      userID:{
        type:String
      }
})
userSchema.plugin(passportLocalMongoose)
const User=mongoose.model('User',userSchema)

export default User;
