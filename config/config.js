var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

// -----------------------
// Expose config
// -----------------------

// root: directorio root del proyecto
// publicdir: directorio donde están los assets
// title: título base para el sitio
// fbappid: Facebook App ID (cambiarlo también en fb.js)
// gaid: Google Analytics property ID

module.exports = {
  development: {
    root: rootPath,
    publicdir: '/public',
    title: '[TODO: title]',
    fbappid: '[TODO: Facebook App ID]',
    gaid: '[TODO: UA]',
    domain: '[TODO: domain]'
  },
  production: {
    root: rootPath,
    publicdir: '/public',
    title: '[TODO: title]',
    fbappid: '[TODO: Facebook App ID]',
    gaid: '[TODO: UA]',
    domain: 'http://www.nitramjs.com'
  }
}