/* ===================
    Variables
   =================== */

var express = require('express')
var env = process.env.NODE_ENV || 'development'
var config = require('./config/config')[env]
var fs = require('fs')

require('express-namespace')

/* ===================
    Main
   =================== */

var app = express()

// 301 redirect to domain
app.use(function(req, res, next) {
  if (env == 'production' && req.headers.host != '[TODO: url without protocol]') {
    res.redirect(301, '[TODO: url]');
    res.end();
  } else {
    next();
  }
});

// Bootstrap application settings
require('./config/express')(app, config)

// Start the app by listening on <port>
var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log("Listening on " + port);
});

// Expose app
exports = module.exports = app