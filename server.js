const express = require("express");
require("dotenv").config();

const { initDb } = require("./db/connect");
const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Contacts API");
});

app.use("/contacts", contactsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});