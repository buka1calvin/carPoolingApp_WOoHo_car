import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
 
const userSchema=new mongoose.Schema({
     firstname: {
        type: String,
      },
     lastname: {
        type: String,
     }
    ,
      email: {
        type: String,
        unique: true
      },
      role:{
        type:String,
        default:'passenger'
      },
      password: {
        type: String,
      },
      phoneNumber: {
        type: String,
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
      },
      provider:{
        type:String,
      }
},
{ timestamps: true }
)
userSchema.plugin(passportLocalMongoose)
const User=mongoose.model('User',userSchema)

export default User;
