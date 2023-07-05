const { timeStamp } = require('console');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ride_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  booked_seats: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'rejected', 'approved'],
    default: 'pending',
  }
},
{ timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;