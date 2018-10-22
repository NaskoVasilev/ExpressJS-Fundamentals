const mongoose =require('mongoose')
mongoose.Promise=global.Promise

module.exports=function(connectionString){
    mongoose.connect(connectionString)

    let database=mongoose.connection
    database.once('open',(err)=>{
        if(err){
            console.log(err)
            console.log('Connection failed!')
            return
        }
        console.log('Successfully connected!')
    })

    require('../models/Meme')
    require('../models/Genre')
}