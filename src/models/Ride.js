import { number } from "joi";
import mongoose from "mongoose";

const rideSchema=new mongoose.Schema({
    origin: {
        type: String,
        required: true
      },
      destination: {
        type: String,
        required: true
      },
      otherStations: {
        type: String
      },
      seats: {
        type: Number,
        required: true
      },
      driverId: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      departureDate: {
        type: Date,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
},
{ timestamps: true }
)
const Ride=mongoose.model('Ride',rideSchema)

export default Ride;
