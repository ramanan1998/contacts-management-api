const express = require("express");
const errorHandler = require("./middleware/error-handler");
const dotenv = require("dotenv").config();
const connectDb = require("./dbconfig");
const app = express();

connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", require("./routes/contact-routes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));