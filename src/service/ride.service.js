import Ride from "../models/Ride"

export const createNewRide=async( rideInfo, driverId )=>{
    const {origin, destination, otherStations, seats, departureDate, price} = rideInfo;
    const newRide=await Ride.create(
        {
            origin,
            destination,
            otherStations,
            status: "Available", 
            seats, 
            driverId,
            departureDate,
            price
            
        }
    )
    return newRide
}