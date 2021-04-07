const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then((docs) => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: product,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.get("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .exec()
        .then((doc) => {
            console.log(doc);
            // If doc is not null
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(200).json({
                    message:
                        "No Product exist in the database for the given Product ID",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.patch("/:productId", (req, res, next) => {
    const productId = req.params.productId;

    const updatesInProduct = {};

    for (const ops of req.body) {
        updatesInProduct[ops.propName] = ops.propValue;
    }

    // Can also use updateAll() as our ID will match only one Product
    Product.updateOne({ _id: productId }, { $set: updatesInProduct })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.delete("/:productId", (req, res, next) => {
    const productId = req.params.productId;
    Product.remove({ _id: productId })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
