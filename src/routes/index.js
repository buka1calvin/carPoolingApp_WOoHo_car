import express from "express";
import user from './api/user.routes';
import ride from './api/ride.routes';
import booking from './api/booking.routes';

const routes=express.Router();
routes.use('/users',user);
routes.use('/rides', ride)
routes.use('/bookings',booking);

export default routes;

