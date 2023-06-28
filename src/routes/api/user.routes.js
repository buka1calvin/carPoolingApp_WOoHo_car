import { Router } from "express";
import { createUser,loginUser} from "../../controllers/user.controler";
import { signupValidation } from "../../validations/signUp.validation";
import userExist from "../../middleWares/userCheck";
import userValidation from "../../validations/login.validation";
import verifyOtp from "../../middleWares/verifyOTP";
import { assignUserRole,updateUserStatus } from "../../controllers/admin.controller";


const router=Router();

router.post('/signUp',signupValidation,userExist,createUser)
router.post('/login',userValidation,loginUser)
router.post('/login/validate/:token',verifyOtp)
router.patch('/:id/roles',assignUserRole)
router.patch('/:id/status',updateUserStatus)



export default router;