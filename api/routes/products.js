const express = require("express");

const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then((result) => {
            res.status(200).json(result);
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
        name: req.body.name,
        price: req.body.price,
    });

    product
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Product added",
                createdProduct: result,
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
        .then((result) => {
            // If result is not null
            if (result) {
                res.status(200).json(result);
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

    Object.keys(req.body).forEach((key) => {
        updatesInProduct[key] = req.body[key];
    });

    Product.findByIdAndUpdate(productId, updatesInProduct)
        .exec()
        .then((result) => {
            res.status(200).json({
                message: `Updated product ${productId}`,
                updatedProduct: result,
            });
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
    Product.findByIdAndDelete(productId)
        .exec()
        .then((result) => {
            res.status(200).json({
                message: `Deleted product ${productId}`,
                deletedProduct: productId,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
