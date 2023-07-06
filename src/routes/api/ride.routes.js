import { Router } from 'express';
import { createRide , searchRide } from '../../controllers/ride.controller';
import extractToken from '../../middleWares/checkUserWithToken';
import {
  rideValidation,
} from '../../validations/rideCreation.validation';

const router = Router();

router.post('/', extractToken, rideValidation, createRide);
router.get('/search',  searchRide);

export default router;
