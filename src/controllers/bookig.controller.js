import Booking from "../models/Booking";
import Ride from "../models/Ride";

export const approveBooking = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "driver") {
      return res.status(401).json({ message: "unauthorized1" });
    }
    const bookingId = req.params._id;
    const booking = await Booking.findById(bookingId);
    const rideId = booking.ride_id;
    const ride = await Ride.findById(rideId);

    if (!booking) {
      return res.status(400).json({ message: "Booking doesn't exist!" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Booking is already approved or rejected!" });
    }
    if (user._id.toString() !== ride.driverId.toString()) {
      return res
        .status(401)
        .json({ message: "You're not the driver who posted the ride!" });
    }
    const newStatus = req.body.status;
    console.log("+++++", newStatus);

    if (newStatus === "approved") {
      booking.status = "approved";
      await booking.save();

      const bookedSeats = booking.booked_seats;

      if (!ride) {
        return res.status(400).json({ message: "Ride doesn't exist!" });
      }

      ride.seats -= bookedSeats;
      await ride.save();

      return res
        .status(200)
        .json({ message: "Booking approved successfully!" });
    } else if (newStatus === "rejected") {
      await Booking.findByIdAndDelete(bookingId);

      return res.status(200).json({ message: "Booking rejected and removed!" });
    } else {
      return res.status(400).json({ message: "Invalid status provided!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
