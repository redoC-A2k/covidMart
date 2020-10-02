const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    inStock: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: [
        { type: String }
    ],
    images: [
        { type: String }
    ]
})

const Products = mongoose.model("Product", productSchema)
module.exports = Products;