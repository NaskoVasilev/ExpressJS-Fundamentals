let mongoose = require('mongoose')
let Schema=mongoose.Schema

let tagSchema =new  Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    creationDate: { type: mongoose.Schema.Types.Date,required:true, dafault:Date.now() },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
})
let Tag= mongoose.model('Tag', tagSchema)
module.exports =Tag