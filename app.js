const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRouter = require("./api/routes/products");
const orderRouter = require("./api/routes/orders");

const app = express();

mongoose.connect(
    "mongodb+srv://" +
        process.env.MONGO_ATLAS_USER +
        ":" +
        process.env.MONGO_ATLAS_PW +
        "@node-rest-shop.jqorjie.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
    console.log("*** CONNECTED TO DATABASE ***");
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling the CORS Error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200);
    }

    next();
});

app.use("/products", productRouter);
app.use("/orders", orderRouter);

// If the request does not goes to any of the above routes, than we have to send a error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
});

module.exports = app;
