const swaggerAutogen = require("swagger-autogen")();

const isProduction = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for managing contacts"
  },
  host: isProduction
    ? "cse341-contacts-4gwr.onrender.com"
    : "localhost:3000",
  schemes: isProduction ? ["https"] : ["http"]
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);