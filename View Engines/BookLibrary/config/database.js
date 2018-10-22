const mongoose=require('mongoose')

module.exports=function(config){
    mongoose.connect(config.connectionString,(err)=>{
        if(err){
            console.log(err)
            return
        }

        console.log('Connect to database successfully!')
    })
}