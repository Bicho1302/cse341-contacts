const express = require("express");
require("dotenv").config();

const { initDb } = require("./db/connect");
const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Contacts API");
});

app.use("/contacts", contactsRoutes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});