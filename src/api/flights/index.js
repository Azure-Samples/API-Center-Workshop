import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import gql from "graphql-tag";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import the cors middleware

// Sample flight data
const flights = [
  {
    id: "1",
    departureCity: "New York",
    arrivalCity: "Los Angeles",
    departureDate: "2025-03-15",
    returnDate: null,
    passengers: 1,
    price: 250,
    type: "One-way",
  },
  {
    id: "2",
    departureCity: "London",
    arrivalCity: "Paris",
    departureDate: "2025-04-10",
    returnDate: "2025-04-20",
    passengers: 2,
    price: 400,
    type: "Return",
  },
  {
    id: "3",
    departureCity: "Chicago",
    arrivalCity: "Miami",
    departureDate: "2025-05-01",
    returnDate: null,
    passengers: 1,
    price: 220,
    type: "One-way",
  },
  {
    id: "4",
    departureCity: "San Francisco",
    arrivalCity: "Seattle",
    departureDate: "2025-06-12",
    returnDate: "2025-06-19",
    passengers: 3,
    price: 350,
    type: "Return",
  },
  {
    id: "5",
    departureCity: "Boston",
    arrivalCity: "Atlanta",
    departureDate: "2025-07-04",
    returnDate: null,
    passengers: 2,
    price: 280,
    type: "One-way",
  },
  {
    id: "6",
    departureCity: "Houston",
    arrivalCity: "Denver",
    departureDate: "2025-08-15",
    returnDate: "2025-08-22",
    passengers: 1,
    price: 320,
    type: "Return",
  },
  {
    id: "7",
    departureCity: "Las Vegas",
    arrivalCity: "Orlando",
    departureDate: "2025-09-10",
    returnDate: null,
    passengers: 4,
    price: 410,
    type: "One-way",
  },
  {
    id: "8",
    departureCity: "Miami",
    arrivalCity: "Dallas",
    departureDate: "2025-10-05",
    returnDate: "2025-10-12",
    passengers: 2,
    price: 300,
    type: "Return",
  },
  {
    id: "9",
    departureCity: "Philadelphia",
    arrivalCity: "Phoenix",
    departureDate: "2025-11-20",
    returnDate: null,
    passengers: 1,
    price: 330,
    type: "One-way",
  },
  {
    id: "10",
    departureCity: "San Diego",
    arrivalCity: "Portland",
    departureDate: "2025-12-01",
    returnDate: "2025-12-08",
    passengers: 3,
    price: 370,
    type: "Return",
  },
];

// GraphQL schema using the gql tag 
const typeDefs = gql`
# Define the Flight type with fields
  type Flight {
    id: ID!
    departureCity: String!
    arrivalCity: String!
    departureDate: String!
    returnDate: String
    passengers: Int!
    price: Int!
    type: String!
  }

# Queries for fetching flights, cities, passengers, and alternative dates
  type Query {
    getFlights(departureCity: String, arrivalCity: String, departureDate: String, returnDate: String, passengers: Int, type: String): [Flight]
    getCities: [String]
    getPassengers: [Int]
    getAlternativeDates(departureCity: String!): [String] # Added getAlternativeDates query
  }

# Mutation for booking a new flight
  type Mutation {
    bookFlight(
      departureCity: String!
      arrivalCity: String!
      departureDate: String!
      returnDate: String
      passengers: Int!
      type: String!
    ): Flight
  }
`;

// Define resolvers for the schema fields
const resolvers = {
  Query: {
    getFlights: (_, { departureCity, arrivalCity, departureDate, returnDate, passengers, type }) => {
      return flights.filter(flight => {
        const depCityMatch = !departureCity || flight.departureCity.toLowerCase() === departureCity.toLowerCase();
        const arrCityMatch = !arrivalCity || flight.arrivalCity.toLowerCase() === arrivalCity.toLowerCase();
        const departureDateMatch = !departureDate || flight.departureDate === departureDate;
        const returnDateMatch = !returnDate || flight.returnDate === returnDate;
        const passengersMatch = !passengers || flight.passengers === passengers;
        const typeMatch = !type || flight.type.toLowerCase() === type.toLowerCase();
        return depCityMatch && arrCityMatch && departureDateMatch && returnDateMatch && passengersMatch && typeMatch;
      });
    },
    getCities: () => {
      const departureCities = flights.map(flight => flight.departureCity);
      const arrivalCities = flights.map(flight => flight.arrivalCity);
      return [...new Set([...departureCities, ...arrivalCities])];
    },
    getPassengers: () => {
      const passengers = flights.map(flight => flight.passengers);
      return [...new Set(passengers)];
    },
    getAlternativeDates: (_, { departureCity }) => {
      // Fetch alternative dates from the API for the requested departure city
      return flights
        .filter(flight => flight.departureCity.toLowerCase() === departureCity.toLowerCase())
        .map(flight => flight.departureDate);
    }
  },
  Mutation: {
    bookFlight: (_, args) => {
      const newFlight = { id: String(flights.length + 1), ...args, price: 300 };
      flights.push(newFlight);
      return newFlight;
    },
  },
};

async function startServer() {
  // Create Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // Create an Express app
  const app = express();
  const port = 4000;

  // Apply the cors middleware with specific origin
app.use(cors());

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  app.use("/graphql", bodyParser.json(), expressMiddleware(server));

  // Start the server
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
  );
}

startServer();