const formidable =require('formidable')
const mongoose=require('mongoose')
let Tag=mongoose.model('Tag')


module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    const form =new formidable.IncomingForm()

    form.parse(req,(err,fields,files)=>{
      let date=Date.now()
      const tag={
        name:fields.tagName,
        creationDate:date,
        images:[]
      }
      Tag.create(tag)
      .then(()=>{
        res.writeHead(302,{
          Location:'/'
        })
          res.end()
        }).catch(err=>{
        console.log(err)
      })
    })
  } else {
    return true
  }
}
