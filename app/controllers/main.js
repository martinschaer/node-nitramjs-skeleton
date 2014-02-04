// -----------------------
// Variables
// -----------------------

var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env]


// Dependencias

// var data = require('../../config/data')

// -----------------------
// Controller Actions
// -----------------------

//
// Basic
//
var parentController = function(req, res, ifXHR) {

  if (typeof ifXHR == 'undefined') {
    ifXHR = function() {
      res.json({})
    }
  }

  if (req.xhr) {
    ifXHR();
  } else {
    res.render('home', {
      title: config.title,
      config: config
    })
  }
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