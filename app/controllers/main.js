// -----------------------
// Variables
// -----------------------

var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env]


// Dependencias

// var data = require('../../config/data')
var xhrHelper = require('../../lib/xhr-helper')

// -----------------------
// Controller Actions
// -----------------------

//
// Basic
//
var parentController = function(req, res, ifXHR) {

  var url = req.protocol + '://' + req.headers.host + req.url;

  if (typeof ifXHR == 'undefined') {
    ifXHR = function() {
      res.json({})
    }
  }

  xhrHelper.isXHR(req, ifXHR, function() {
    res.render('home', {
      title: config.title,
      config: config,
      // host: req.headers.host,
      url: url,
      bodyClass: 'home'
    })
  })
}


//
// Home
//
exports.home = function(req, res) {
  parentController(req, res, function() {
    res.render('partials/home')
  })
}

//
// Hello World
//
exports.helloworld = function(req, res) {
  parentController(req, res, function() {
    res.render('partials/helloworld')
  })
}