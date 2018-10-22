const fs = require('fs')
const shortid = require('shortid')

const Meme = require('../models/Meme')
const Genre = require('../models/Genre')

// Utils

let defaultResponse = (respString, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(respString)
}

let fieldChecker = obj => {
  for (let prop in obj) {
    if (obj[prop] === '') {
      return true
    }
  }
}


module.exports.viewAll = (req, res) => {
  fs.readFile('./views/viewAll.html', (err, html) => {
    if (err) {
      console.log(err)
      return
    }

    Meme.find()
      .then(memes => {
        memes = memes
          .sort((a, b) => {
            return b.dateOfCreation - a.dateOfCreation
          })

        let responseString = ''
        for (let meme of memes) {
          responseString += `<div class="meme">
    <a href="/getDetails/${meme.id}">
    <img class="memePoster" src="${meme.memeSrc}"/>          
    </div>`
        }
        html = html
          .toString()
          .replace('<div id="replaceMe">{{replaceMe}}</div>', responseString)

        defaultResponse(html, res)
      }).catch(err => {
        console.log(err)
        return
      })
  })
}

function addMemeGet(req, res, status = null) {
  fs.readFile('./views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    Genre.find().then(genres => {
      let exitString = ''
      for (let genre of genres) {
        exitString += `<option value="${genre.id}">${genre.genreName}</option>`
      }
      defaultResponse(
        data
          .toString()
          .replace('<div id="replaceMe">{{replaceMe2}}</div>', exitString),
        res
      )
    }).catch(err => {
      console.log(err)
      return
    })


    if (status === 'err') {
      data = data
        .toString()
        .replace(
          '<div id="replaceMe">{{replaceMe}}</div>',
          '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>'
        )
    }
    if (status === 'suc') {
      data = data
        .toString()
        .replace(
          '<div id="replaceMe">{{replaceMe}}</div>',
          '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>'
        )
    }

  })
}
module.exports.addMemeGet = addMemeGet

module.exports.addGenreGet = (req, res) => {
  fs.readFile('./views/addGenre.html', (err, data) => {
    if (err) {
      console.log(err)
    }
    defaultResponse(data, res)
  })
}

module.exports.addGenrePost = (req, res) => {
  let data = req.body
  Genre.create({
    genreName: data.genreName,
    memes: []
  }, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.redirect('/')
  })
}

module.exports.addMemePost = (req, res) => {
  let body = req.body
  let file = req.files.meme
  let fileName = shortid.generate(10) + '.jpg'
  if (fieldChecker(body) || !file) {
    addMemeGet(req, res, 'err')
    return
  }
  file.mv('./public/memeStorage' + fileName, function (err) {
    if (err) {
      console.log(err)
      return
    }

    let genreId = body.genreSelect
    Meme.create({
      memeName: body.memeTitle,
      dateOfCreation: Date.now(),
      memeSrc: './public/memeStorage' + fileName,
      description: body.memeDescription,
      genreId: genreId
    }).then((meme) => {
      addMemeGet(req, res, 'suc')
      Genre.findOne({ _id: genreId })
        .then((genre) => {
          genre.memes.push(meme._id)
          genre.save()
        }).catch(err => {
          console.log(err)
          return
        })
    }).catch(err => {
      console.log(err)
      return
    })
  })
}

module.exports.details = (req, res) => {
  let targetId = req.params.id

  Meme.findOne({ _id: targetId })
    .then(meme => {
      let replaceString = `<div class="content">
  <img src="${meme.memeSrc.substr(1)}" alt=""/>
  <h3>Title  ${meme.memeName.substr(1)}</h3>
  <p> ${meme.description}</p>
  <a href="/download/${meme.memeSrc}" >Download Meme</a>
  <a href="meme/delete/${meme._id}">Delete</a>
  </div>`

      fs.readFile('./views/details.html', (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        data = data
          .toString()
          .replace('<div id="replaceMe">{{replaceMe}}</div>', replaceString)
        defaultResponse(data, res)
      })

    }).catch(err => {
      console.log(err)
      return
    })
}

module.exports.removeMeme = (req, res) => {
  let id = req.params.id

  Meme.findByIdAndRemove(id)
    .then(meme => {
      let genreId = meme.genreId
      Genre.findOne({ _id: genreId })
        .then(genre => {
          res.redirect('/viewAllMemes')
          let index = genre.memes.indexOf(meme._id)
          genre.memes.splice(index, 1)
          genre.save()
        }).catch(err => {
          console.log(err)
        })
    }).catch(err => {
      console.log(err)
    })
}

module.exports.renderSearchView = (req, res) => {
  fs.readFile('./views/searchMeme.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    Genre.find()
      .then(genres => {
        let exitString = ''

        for (let genre of genres) {
          exitString += `<option value="${genre.id}">${genre.genreName}</option>`
        }

        data = data
          .toString()
          .replace('<div id="replaceMe">{{replaceMe}}</div>', exitString)
        defaultResponse(data, res)
      })
  })

}

module.exports.searchForMeme=(req,res)=>{
  let body =req.body

  let memeName=body.memeTitle
  let genreId=body.genreSelect
  
  if(memeName && genreId){
    Meme.find({memeName:memeName})
    .then(memes=>{
      let targetMemes=[]
      for (const meme of memes) {
        if(meme.genreId.toString()===genreId)
        {
          targetMemes.push(meme)
        }
      }
      viewAll(targetMemes,res)
    })
  }else if(memeName){
    Meme.find({memeName:memeName})
    .then(memes=>{
      viewAll(memes,res)
    })
  }else if(genreId){
    Genre.findOne({_id:genreId})
    .then(genre=>{
      let memePromises=[]
      for (const memeId of genre.memes) {
        let memePromise=Meme.findById(memeId)
        memePromises.push(memePromise)
      }

      Promise.all(memePromises).then(memes=>{
        viewAll(memes,res)
      })
    })
  }
}

function viewAll(sorted,res){
  sorted = sorted
  .sort((a, b) => {
    return b.dateStamp - a.dateStamp
  })
  let responseString = ''
  for (let meme of sorted) {
    responseString += `<div class="meme">
  <a href="/getDetails/${meme.id}">
  <img class="memePoster" src="${meme.memeSrc}"/>          
  </div>`
  }

  fs.readFile('./views/viewAll.html', (err, html) => {
    if (err) {
      console.log(err)
      return
    }
    html = html
      .toString()
      .replace('<div id="replaceMe">{{replaceMe}}</div>', responseString)

    defaultResponse(html, res)
  })
}




 
