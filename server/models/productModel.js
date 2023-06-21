const mongoose = require("mongoose");
const mongoose_fuzzy = require("mongoose-fuzzy-searching")
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
    category:{
        type:String,
        required:true
    },
    rating: [{
        _id:false,
        userId:{
            type:String
        },
        value:{
            type:Number
        }
    }],
    description: [
        { type: String }
    ],
    images: [
        { type: String }
    ]
})

// TODO: As this plugin has been added after all the products were already saved in the database,
// So either clear products collection and repopulate it or add index
productSchema.plugin(mongoose_fuzzy,{
    fields:['title'],
})
module.exports = mongoose.model("Product", productSchema)