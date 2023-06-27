import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import 'dotenv/config'
import passport from "passport";
import User from "../models/user";
import { generateToken } from "../utils/generateToken";
// console.log(process.env.GOOGLE_CLIENT_ID)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/users/google/callback",
    passReqToCallback:true
  },
  async function(accessToken, refreshToken, profile, done) {
      // console.log("you're trying to access something",profile)
      try{
        // console.log(profile.id)
        if (!profile.emails || profile.emails.length === 0) {
          // Handle case when emails property is undefined or empty
          console.log("No email found in the Google profile");
          return done(null, false);
        }
        const existingUser=await User.findOne({email:profile.emails[0].value})
        console.log("+++++++++",existingUser)
        if(existingUser){
          const {id,firstname,email,role}=existingUser
          const person={id,firstname,email,role}
          const token=generateToken(person)
          console.log(existingUser)
          return done(null,{existingUser,token})

        }
        else{
          const newUser=await User.create({
            firstname:profile._json.given_name || '',
            lastname:profile._json.family_name || '',
            profilePic: profile._json.picture || '',
            email:profile._json.email,
            isEmailVerified: true,
            provider:'google'
          })
          // console.log(newUser)
          const {id,firstname,email,role}=newUser;
          const person={id,firstname,email,role}
          const token=generateToken(person)
          return done(null,{newUser,token})
        }

      }
      catch(err){
        console.log("++++++",err)

      }

  }
));

passport.serializeUser((user,done)=>{
  console.log("++++++++++",user)
  done(null,user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});
