// -----------------------
// Module dependencies.
// -----------------------

var express = require('express')
var pkg = require('../package')
var env = process.env.NODE_ENV || 'development'
var config = require('../config/config')[env]
var helpers = require('view-helpers')

// -----------------------
// Expose
// -----------------------

module.exports = function(app, config) {

  app.set('showStackError', true)

  // use express favicon
  app.use(express.favicon())

  app.use(express.logger('dev'))

  // views config
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')

  app.configure(function() {
    // expose pkg and node env to views
    app.use(function(req, res, next) {
      res.locals.pkg = pkg
      res.locals.env = env
      next()
    })

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    // view helpers
    app.use(helpers(config.title))

    // routes should be at the last
    app.use(app.router)

    // static
    app.use(express.static(config.root + config.publicdir))

    // custom error handler
    app.use(function(err, req, res, next) {
      if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next()
      }

      console.error(err.stack)
      res.status(500).render('500', {
        config: config
      })
    })

    app.use(function(req, res, next) {
      res.status(404).render('404', {
        config: config
      })
    })
  })
}