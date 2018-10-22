const formidable = require('formidable')
const mongoose = require('mongoose')
const url = require('url')
const querystring = require('querystring')
let Image = mongoose.model('Image')
let Tag = mongoose.model('Tag')
function addImage(req, res) {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    let tags = fields.tagsID
      .split(',')
      .filter(t => t !== '')
      .reduce((a, b) => {
        if (!a.includes(b)) {
          a.push(b)
        }
        return a
      }, [])
      .map(t => mongoose.Types.ObjectId(t))
    const image = {
      url: fields.imageUrl,
      description: fields.description,
      title: fields.imageTitle,
      tags: tags,
      creationDate: Date.now(),
    }
    Image.create(image)
      .then((img) => {
        Tag.update({ _id: { $in: tags } }, { $push: { images: img._id } }, { multi: true })
          .then(() => {
            res.writeHead(302, {
              Location: '/'
            })
            res.end()
          }).catch(err => {
            console.log(err)
            return
          })
      }).catch(err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
      })
  })
}

function deleteImg(req, res) {
  let urlObj = url.parse(req.url)
  let id = querystring.parse(urlObj.query).id

  Image.deleteOne({ _id: id })
    .then(() => {
      Tag.update({images:mongoose.Types.ObjectId(id)},{$pull :{images:mongoose.Types.ObjectId(id)}})
      .then(e=>{
        console.log(e) 
        res.writeHead(302, {
        Location: '/search'
      })
      res.end()
      })
    })
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
