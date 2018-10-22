const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://atanas:atanas24112001@ds137913.mlab.com:37913/expressjssoftuniwiki',
    port: process.env.PORT || 7280
  },
  staging: {
  },
  production: 
  {
	rootPath: rootPath,
    db: 'mongodb://atanas:atanas24112001@ds137913.mlab.com:37913/expressjssoftuniwiki',
    port: process.env.PORT || 7280
  }
}
