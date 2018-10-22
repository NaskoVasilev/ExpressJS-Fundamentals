const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    category: {type: String, enum: ['chicken', 'beef', 'lamb'], required: "Category is required"},
    size: {type: Number, min: 17, max: 24, required: "Size must be between 17 and 21"},
    imageUrl: {type: String, required: "Image uel is required"},
    toppings: [{type: String, default: []}]
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product