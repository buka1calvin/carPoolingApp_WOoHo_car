import { Router } from "express";
import { createRide } from "../../controllers/ride.controller";
import extractToken from "../../middleWares/checkUserWithToken";
import { rideValidation } from "../../validations/rideCreation.validation";
import { createBooking } from "../../controllers/ride.controller";

const router = Router();

router.post("/", extractToken, rideValidation, createRide);
router.post('/:_id/bookings',extractToken,createBooking)

export default router;