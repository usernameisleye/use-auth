require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const connectToDb = require("./config/dbConnect")
const app = express();

// Connect to DB
connectToDb(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", require("./routes/user.routes"));

// Handle errors
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ error: error.message });

    next();
});

