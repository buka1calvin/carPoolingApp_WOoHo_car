import mongoose from "mongoose";
// import passportLocalMongoose from 'passport-local-mongoose';
 
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: 'passenger',
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePic: {
    type: String,
    default: 'https://res.cloudinary.com/dd92qmql1/image/upload/v1688126539/DEV/user_3_nec6s8.png',
  },
  location: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  bio: {
    type: String,
    default: "I'm chatty when I feel comfortable",
  },
  userId: {
    type: String,
  },
  provider: {
    type: String,
  },
  DOB: {
    type: String,
  },
  preferredLanguage: {
    type: String,
  },
  preferredCurrency: {
    type: String,
  },
  billingAddress: {
    type: mongoose.Schema.Types.Mixed,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
}, { timestamps: true });



// userSchema.plugin(passportLocalMongoose)
const User=mongoose.model('User',userSchema)

export default User;
