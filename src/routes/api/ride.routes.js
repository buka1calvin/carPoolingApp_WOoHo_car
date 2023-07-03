import { Router } from "express";
import { createRide } from "../../controllers/ride.controller";
import extractToken from "../../middleWares/checkUserWithToken";
import { rideValidation } from "../../validations/rideCreation.validation";

const router = Router();

router.post("/", extractToken, rideValidation, createRide);

export default router;