import { Router } from "express";
import extractToken from "../../middleWares/checkUserWithToken";
import { approveBooking } from "../../controllers/bookig.controller";

const router = Router();

router.patch('/:_id/approve',extractToken,approveBooking)
export default router;