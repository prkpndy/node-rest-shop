const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Order list",
    });
});

router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "Order Added",
        order: {
            productId: req.body.productId,
            quantity: req.body.quantity,
        },
    });
});

router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Order Information",
        orderId: req.params.orderId,
    });
});

router.delete("/", (req, res, next) => {
    res.status(200).json({
        message: "Order Deleted",
        orderId: req.params.orderId,
    });
});

module.exports = router;
