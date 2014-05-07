// -----------------------
// Module dependencies.
// -----------------------

var express = require('express')
var pkg = require('../package')
var env = process.env.NODE_ENV || 'development'
var config = require('../config/config')[env]
var helpers = require('view-helpers')
//LOS MODULOS DE EXPRESS AHORA ESTAN SEPARADOS
//VER PACKAGE.JSON PARA LOS MODULOS MAS COMUNES
var bodyParser = require('body-parser')
// var methodOverride = require('method-override')
// var favicon = require('static-favicon')

// -----------------------
// Expose
// -----------------------

module.exports = function(app, config) {

  app.set('showStackError', true)

  // use express favicon

  //USANDO FAVICON CON MODULO EXTERNO
  app.use(require('static-favicon')(config.root + '/public/img/favicon.ico'))

  // views config
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')
  // expose pkg and node env to views
  app.use(function(req, res, next) {
    res.locals.pkg = pkg
    res.locals.env = env
    next()
  })

  // bodyParser should be above methodOverride

  //USO DE LOS NUEVOS MODULOS
  app.use(bodyParser())
  //O SE PUEDE LLAMAR DIRECTAMENTE
  app.use(require('method-override')())

  // view helpers
  app.use(helpers(config.title))

  // routes should be at the last

  // app.use(app.router) YA NO SE USA AHORA LAS RUTAS ES INYECTAN DIRECTAMENTE
  //LAS RUTAS DEBEN IR AQUI DESPUES DE LOS MODULOS Y ANTES DE LOS STATICOS

  require('./routes')(app);
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
}

//MAS INFO EN 
//https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x