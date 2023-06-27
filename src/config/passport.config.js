const LocalStrategy = require('passport-local').Strategy;
const { BcryptUtil } = require("../utils/bcrypt");
import User from '../models/user';

passport.use(new LocalStrategy({
  usernameField: 'email', 
  passwordField:'password'
}, async (email, password, done) => {
  try {
    const foundUser = await User.findOne({ email});

    if (!foundUser) {
      return done(null, false);
    }

    const passwordMatches = await BcryptUtil.compare(password, foundUser.password);

    if (!passwordMatches) {
      return done(null, false);
    }

    return done(null, foundUser);
  } catch (error) {
    return done(error);
  }
}));
