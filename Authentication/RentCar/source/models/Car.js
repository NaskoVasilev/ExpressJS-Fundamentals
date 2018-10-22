const mongoose = require('mongoose')
const propertyIsRequired = '{0} is required.'

let carSchema = mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.String,
        required: propertyIsRequired.replace('{0}', 'Brand'),
    },
    model:{
        type: mongoose.Schema.Types.String,
        required: propertyIsRequired.replace('{0}', 'Model'),
    },
    pricePerDay:{
        type:mongoose.Schema.Types.Number,
        required:propertyIsRequired.replace('{0}','Price per day')
    },
    imageUrl:{
        type:mongoose.Schema.Types.String
    },
    year:{
        type:mongoose.Schema.Types.Number
    },
    isRented:{
        type:mongoose.Schema.Types.Boolean,
        ref:'User'
    }
})

let Car = mongoose.model('Car',carSchema)

module.exports= Car