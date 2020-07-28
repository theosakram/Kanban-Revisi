require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const route = require("./router");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(route);
app.use(errorHandler);

app.listen(port, (_) => console.log(`Listening on port ${port}`));
