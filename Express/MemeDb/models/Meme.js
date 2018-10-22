const mongoose=require('mongoose')

let memeSchema=mongoose.Schema({
    memeName:{type:String,required:true},
    dateOfCreation:{type:Date,required:true},
    memeSrc:{type:String},
    description:{type:String,required:true},
    genreId:{type:mongoose.Schema.Types.ObjectId,ref:'Genre'}
})

module.exports=mongoose.model('Meme',memeSchema)