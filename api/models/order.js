const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
