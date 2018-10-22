const express=require('express')
const handlebars=require('express-handlebars')
const app=express()

app.engine('.hbs',handlebars({
    extname:'.hbs'
}))
app.set('view engine','.hbs')
let context = {
    contacts: [
      { name: 'Ivan Ivanov', email: 'i.ivanov@gmail.com'},
      { name: 'Maria Petrova', email: 'mar4eto@abv.bg'},
      { name: 'Jordan Kirov', email: 'jordk@gmail.com'}
  ]}
  
app.get('/',(req,res)=>{
    res.render('index',context)
})

app.listen(8000)