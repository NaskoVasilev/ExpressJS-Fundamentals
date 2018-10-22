let mongoose = require('mongoose')

let imageSchema = new mongoose.Schema({
    url: { type: mongoose.Schema.Types.String, required: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    creationDate: { type: mongoose.Schema.Types.Date,required:true, dafault: Date.now() },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
})
let Image=mongoose.model('Image', imageSchema)
module.exports = Image