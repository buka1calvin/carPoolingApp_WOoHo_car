import { createNewRide } from "../service/ride.service";
import Booking from "../models/Booking";
import Ride from "../models/Ride";

export const createRide = async (req, res) => {
  try {
    const user = req.user;
    const { origin, destination, otherStation, seats, departureDate, price } =
      req.body;
    const driverId = user._id;
    const rideInfo = {
      origin,
      destination,
      otherStation,
      seats,
      departureDate,
      price,
    };
    console.log(user);
    if (user.role == "driver") {
      const response = await createNewRide(rideInfo, driverId);
      return res.status(201).json({
        ride: response,
      });
    }
    return res.status(401).json({
      message: "You are not authourized to perform this action",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "passenger") {
     return res.status(401).json({ message: "you are unauthorized!" });
    }
    const bookedSeats = req.body.booked_seats || 1;
    const rideId = req.params._id;

    const ride = await Ride.findById({ _id: rideId });

    if (!ride) {
      return res.status(400).json({ message: "ride does'nt exist!" });
    }
    console.log(ride)
    const bookings = await Booking.findOne({
      ride_Id: rideId,
      user_id: user._id,
    });
    if (bookings) {
      return res.status(403).json({ message: "booking already exist!" });
    }
    if (ride.seats < bookedSeats) {
      return res.status(400).json("ride already booked!");
    }
    const totalPrice = ride.price * bookedSeats;

    const booking = new Booking({
      ride_id: rideId,
      user_id: user._id,
      booked_seats: bookedSeats,
      total_price: totalPrice,
    });

    const savedBooking = await booking.save();

    return res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  export const searchRide = async (req, res) => {
    const { origin, destination, date = new Date().toISOString().split('T')[0], seats } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
  
    const filter = {
      origin,
      destination,
      departureDate: { $gte: startDate, $lt: endDate }
    };
  
    if(seats) {
      filter.seats = { $gte: parseInt(seats) };
    }
  
    try {
      const cars = await Ride.find(filter);
      if (cars.length === 0) {
        return res.status(404).json({ message: "Ride not available!" });
      }
      return res.status(200).json(cars);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred while searching for a ride!" });
    }
  };
  
  
  
