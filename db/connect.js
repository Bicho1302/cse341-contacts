const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db("contactsDB");
    console.log("Connected to MongoDB");
    return database;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
};

module.exports = { initDb, getDb };