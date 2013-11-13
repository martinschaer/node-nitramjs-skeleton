require.config({
  baseUrl: '/js',
  paths: {
    'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
    'facebook': '//connect.facebook.net/es_ES/all',
    'history': '//cdnjs.cloudflare.com/ajax/libs/history.js/1.8/bundled/html5/native.history',
    // 'handlebars': '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.0/handlebars.min',
    'nitram': 'lib/nitram',
    'app': 'app'
  },
  shim: {
    'facebook': {
      'export': 'FB'
    },
    'app': {
      deps: ['jquery', 'history', 'nitram']
    },
    'history': {
      deps: ['jquery']
    },
    // 'handlebars': {
    //   exports: 'Handlebars'
    // }
  }
});

/* TODO: al buildear setear DBG = false y que uglify elimine codigo inaccesable */
var DBG = (typeof DBG == 'undefined') ? true : DBG;

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

require(['jquery', 'app', 'fb', 'history'], function($, app) {

  'use strict';

  $(document).ready(function() {
    if (DBG) console.log('Ready!');

    if (typeof APPGLOBALS == 'undefined') return;

    // export del modulo para poderlo ver desde la consola
    APPGLOBALS.app = app;
  });

});