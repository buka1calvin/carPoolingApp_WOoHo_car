import { Router } from "express";
import { createUser,loginUser} from "../../controllers/user.controler";
import { signupValidation } from "../../validations/signUp.validation";
import userExist from "../../middleWares/userCheck";
import userValidation from "../../validations/login.validation";

const router=Router();
router.post('/signUp',signupValidation,userExist,createUser)
router.post('/login',userValidation,loginUser)

export default router;