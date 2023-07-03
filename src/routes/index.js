import express from "express";
import user from './api/user.routes';
import ride from './api/ride.routes';

const routes=express.Router();
routes.use('/users',user);
routes.use('/rides', ride)

export default routes;

