import { Router } from "express";
import passport from "passport";
import { createUser,loginUser} from "../../controllers/user.controler";
import { signupValidation } from "../../validations/signUp.validation";
import userExist from "../../middleWares/userCheck";
import userValidation from "../../validations/login.validation";
import verifyOtp from "../../middleWares/verifyOTP";
import { assignUserRole,updateUserStatus } from "../../controllers/admin.controller";
import { googleAuthentication, googleCallBack } from '../../controllers/googleCallBack'


const router=Router();

router.post('/signUp',signupValidation,userExist,createUser)
router.post('/login',userValidation,loginUser)
router.post('/login/validate/:token',verifyOtp)
router.patch('/:id/roles',assignUserRole)
router.patch('/:id/status',updateUserStatus)
router.get('/auth',(req,res)=>{
    res.send('<a href="/api/v1/users/auth/google">authenticate with google</a>')
})
router.get('/auth/google',
googleAuthentication
)

router.get('/google/callback', 
  passport.authenticate('google', {
     session: false,
     failureRedirect: '/login' }),
     googleCallBack
);

export default router;