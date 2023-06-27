import { Router } from "express";
import { createUser,loginUser} from "../../controllers/user.controler";
import { signupValidation } from "../../validations/signUp.validation";
import userExist from "../../middleWares/userCheck";
import userValidation from "../../validations/login.validation";
import '../../config/googleAuth'
import passport from "passport";

const router=Router();
router.post('/signUp',signupValidation,userExist,createUser)
router.post('/login',userValidation,loginUser)
router.get('/auth',(req,res)=>{
    res.send('<a href="/api/v1/users/auth/google">authenticate with google</a>')
})
router.get('/auth/google',
(req, res, next) => {
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })(req, res, next);
}
)
router.get('/google/callback',
passport.authenticate('google',{
    failureRedirect:'/failure'
}),
(req, res) => {
    const { user, token } = req.user;
  
    res.status(200).json({ message: 'login successfully', token });
    
  }
)
// router.get('/protected',(req,res)=>{
//    res.send("<h3>welcome to the home page</h3>")
// })

export default router;