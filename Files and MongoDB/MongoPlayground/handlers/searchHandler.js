const mongoose=require('mongoose')
const fs=require('fs')
let Image=mongoose.model('Image')
let Tag=mongoose.model('Tag')
const placeholder='<div class="replaceMe"></div>'
const filePath='./views/results.html'
module.exports = (req, res) => {
  if (req.pathname === '/search') {
    let html=''
   Image.find({})
   .then(images=>{
    for (const image of images) {
      html+= `<fieldset id => <legend>${image.title}</legend> 
      <img src="${image.url}">
      </img><p>${image.description}<p/>
      <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
      </button> 
      </fieldset>` 
    }
    fs.readFile(filePath,'utf8',(err,data)=>{
      if(err){
        console.log(err)
        return
      }
      data=data.replace(placeholder,html)
      res.writeHead(200,{
        'content-type':'text/html'
      })
      res.write(data)
      res.end()
    })
   })
  } else {
    return true
  }
}
