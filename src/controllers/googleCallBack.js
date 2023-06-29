import "../config/googleAuth"
import passport from "passport";

const googleAuthentication = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })(req, res, next);
};

const googleCallBack = (req, res) => {
  const { user, token } = req.user;
  if(user.provider!=='google'){
    res.status(401).json({message:"only google authenticated users!"})
  }
  else{
  res.status(200).json({ message: 'logged in successfully!', token:token });
  }
};

export { googleAuthentication, googleCallBack };
