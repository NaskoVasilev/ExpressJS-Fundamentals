const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    product: {type: mongoose.Schema.Types.ObjectId,ref:'Product'},
    date: {type: mongoose.Schema.Types.Date, default: Date.now},
    toppings: [{type: mongoose.Schema.Types.String, default: []}],
    status: {
        type: mongoose.Schema.Types.String,
        enum: ["Pending", "In Progress", "In transit", "Delivered"],
        default: "Pending"
    }
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order