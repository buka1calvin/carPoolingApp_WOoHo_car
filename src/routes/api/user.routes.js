import { Router } from "express";
import passport from "passport";
import {
  createRide,
  createUser,
  loginUser,
  verifyEmail,
  fillEmail,
  ResetPassword,
} from "../../controllers/user.controler";
import { signupValidation } from "../../validations/signUp.validation";
import userExist from "../../middleWares/userCheck";
import userValidation from "../../validations/login.validation";
import verifyOtp from "../../middleWares/verifyOTP";
import {
  assignUserRole,
  updateUserStatus,
} from "../../controllers/admin.controller";
import {
  googleAuthentication,
  googleCallBack,
} from "../../controllers/googleCallBack";
import {
  getUserProfile,
  editUserProfile,
} from "../../controllers/user.controler";
import extractToken from "../../middleWares/checkUserWithToken";
import upload from "../../config/multer";
import { editUserProfil } from "../../validations/user.validations";
import { otpValidation } from "../../validations/OTP.validation";
import { logoutUser } from "../../controllers/user.controler";
import { updateDriverProfile } from "../../controllers/user.controler";
import { uploadArray } from "../../middleWares/driver.middleware";
import { updateVerificationStatus } from "../../controllers/user.controler";
import { userPayment } from "../../controllers/payment.controller";
import { createBooking } from "../../controllers/ride.controller";

const router = Router();

router.post("/signUp", signupValidation, userExist, createUser);
router.post('/payment',extractToken,  userPayment);
router.post("/login", userValidation, loginUser);
router.post("/reset-password", fillEmail);
router.patch("/reset-password/:token", ResetPassword);
router.get("/verify-email", verifyEmail);
router.post("/login/validate/:token", otpValidation, verifyOtp);
router.patch("/:id/roles", assignUserRole);
router.patch("/:id/status", updateUserStatus);
router.get("/auth", (req, res) => {
  res.send('<a href="/api/v1/users/auth/google">authenticate with google</a>');
});
router.get("/auth/google", googleAuthentication);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallBack
);

router.get("/profile", extractToken, editUserProfil, getUserProfile);

router.put(
  "/profile",
  extractToken,
  editUserProfil,
  upload.single("profilePic"),
  editUserProfile
);

router.patch(
  "/profile/driver",
  extractToken,
  uploadArray("carPictures"),
  updateDriverProfile
);

router.patch("/verification/:id", extractToken, updateVerificationStatus);

router.post("/logout", extractToken, logoutUser);

export default router;
