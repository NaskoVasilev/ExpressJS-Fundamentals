const mongoose=require('mongoose')

let genreSchema=mongoose.Schema({
    genreName:{type:String,required:true},
    memes:[{type:mongoose.Schema.Types.ObjectId,ref:'Meme'}]
})

module.exports=mongoose.model('Genre',genreSchema)