import express from "express";
import user from './api/user.routes';
import ride from './api/ride.routes';
import booking from './api/booking.routes'
import chatApp from './api/chat.routes'
import messagesRoute from './api/message.routes'

const routes=express.Router();
routes.use('/users',user);
routes.use('/rides', ride)
routes.use('/bookings',booking)
routes.use('/chats',chatApp)
routes.use('/messages',messagesRoute)

export default routes;

