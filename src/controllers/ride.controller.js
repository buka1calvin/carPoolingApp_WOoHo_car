import { createNewRide } from "../service/ride.service";

export const createRide = async (req, res) => {
    try {
      const user =req.user;
      const { origin, destination, otherStation, seats, departureDate, price} = req.body;
      const driverId = user._id;
      const rideInfo = {
        origin, 
        destination,
        otherStation,
        seats,
        departureDate,
        price
      }
      console.log(user);
      if (user.role == "driver") {
       const response = await createNewRide( rideInfo, driverId );
       return res.status(201).json({
        ride: response,
      });
      }
      return res.status(401).json({
        message: "You are not authourized to perform this action"
      });
    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error
        })
    }
  };