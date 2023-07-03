export const newRide = {
    tags: ["Ride creation"],
    description: "Create a ride",
    operationId: "create Ride",
    security: [
        {
          bearerAuth: [],
        },
      ],
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties: {
                origin: {
                type: "string",
                description: "where are u from",
                example: "Kicukiro",
              },
              destination: {
                type: "string",
                description: "where you want to go",
                example: "Kabeza",
              },
              otherStations: {
                type: "string",
                description: "other places driver will stop on the way",
                example: "Remera",
              },
              seats: {
                type: "integer",
                description: "number of the available seats,a car has",
                example: "5",
              },
              departureDate: {
                type: "date",
                description: "the date of the journey",
                example: "2022-03-02",
              },
              price: {
                type: "integer",
                description: "the price for the ride",
                example: "2022-03-02",
              },
            },
          },
        },
      },
    },
    responses: {
      // response code
      201: {
        description: "Ride created successfully", // response desc
        content: {

        },
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  };