import Stripe from "stripe";
import Booking from "../models/Booking";

const stripe = Stripe(process.env.SECRETE_KEY);

export const userPayment = async (req, res) => {
  const { email, firstname, id } = req.user;
  try {
    const customer = await stripe.customers.create({
      email,
      name: firstname,
    });

    const bookings = await Booking.find({
      user_id: id,
      status: "approved",
      pay_status: "pending",
    });

    if (bookings.length === 0) {
      res
        .status(404)
        .json("Nothing to pay 😥. wait your booking to be approve");
    } else {
      const line_items = bookings.map((item) => {
        return {
          price_data: {
            currency: process.env.CURRENCY,
            product_data: {
              name: "WooHoo car",
              description: "Drive your dream by WooHoo car",
              metadata: {
                id: item._id,
                ride_id: item.ride_id,
              },
            },
            unit_amount: item.total_price * 100,
          },
          quantity: parseInt(
            item.booked_seats + `${item.booked_seats > 1 ? "seats" : "seat"}`
          ),
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE", "RW"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: process.env.CURRENCY,
              },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: process.env.CURRENCY,
              },
              display_name: "Next day air",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
        line_items,
        mode: "payment",
        customer: customer.id,
        success_url: `${process.env.STRIPECHECKOUT_SUCCESS}/checkout-success`,
        cancel_url: `${process.env.STRIPECHECKOUT_SUCCESS}/bookings`,
      });
      res.send({ url: session.url });

      bookings.forEach(async (booking) => {
        booking.pay_status = "paid";
        await booking.save();
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
