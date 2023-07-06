import Joi from 'joi';

const rideValidationSchema = Joi.object({
  origin: Joi.string().min(3).required(),
  destination: Joi.string().min(3).required(),
  otherStations: Joi.string(),
  seats: Joi.number().required(),
  departureDate: Joi.date().required(),
  price:Joi.number().required()
});

export const rideValidation = async (req, res, next) => {
  const { error } = rideValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

const searchValidationSchema = Joi.object({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  seats: Joi.number(),
  date: Joi.date()
})
console.log(new Date().toISOString())
export const searchValidation = async (req, res, next) => {
  const { error } = searchValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

