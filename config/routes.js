// -----------------------
// Variables
// -----------------------

// controllers
var main = require('../app/controllers/main')
var api = require('../app/controllers/api')

// -----------------------
// Expose
// -----------------------

module.exports = function(app) {
  // main
  app.get('/', main.home)
  app.get('/helloworld', main.helloworld)
  app.get('/contact', main.contact)
  app.get('/features', main.features)
  //
  // API
  //
  // app.get('/api/helloworld', api.helloworld)
}