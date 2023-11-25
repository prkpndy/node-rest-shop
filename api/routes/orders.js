const express = require("express");

const Order = require("../models/order");

const router = express.Router();

router.get("/", (req, res, next) => {
    Order.find()
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
    Order.find({
        userId: req.body.userId,
        productId: req.body.productId,
    })
        .exec()
        .then((oldOrder) => {
            if (oldOrder.length === 1) {
                const prevOrder = oldOrder[0];
                Order.findByIdAndUpdate(prevOrder._id, {
                    quantity: req.body.quantity,
                })
                    .exec()
                    .then((result) => {
                        res.status(201).json({
                            message: `Updated the quantity for product: ${req.body.productId}`,
                            updatedOrder: result,
                        });
                    });
            } else if (oldOrder.length === 0) {
                const order = new Order({
                    userId: req.body.userId,
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                });

                order
                    .save()
                    .then((result) => {
                        res.status(201).json({
                            message: `Placed order for product ${req.body.productId}`,
                            placedOrder: result,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                        });
                    });
            } else {
                res.status(500).json({
                    message: "Internal Server Error",
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

router.get("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
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

router.delete("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findByIdAndDelete(orderId)
        .exec()
        .then((result) => {
            res.status(200).json({
                message: `Deleted order ${orderId}`,
                deletedOrder: result,
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
