define(['jquery', 'nitram'], function($, nitram) {
  'use strict';

  // ----------------------
  // Routes
  // ----------------------

  nitram.routes = {
    '/': {
      controller: 'homeController',
      title: 'Home',
      req: true,
      bodyClass: 'home'
    },
    '/helloworld': {
      controller: 'helloWorldController',
      title: 'Hello World',
      req: true,
      bodyClass: 'hello'
    },
    '/contact': {
      controller: 'contactController',
      title: 'contact',
      req: true,
      bodyClass: 'contact'
    },
    '/features': {
      controller: 'featuresController',
      title: 'features',
      req: true,
      bodyClass: 'features'
    }
  };

  // ----------------------
  // Controllers
  // ----------------------



  nitram.homeController = function(route, data) {
    // compile to intercept new links
    this.compile($('#mainView').html(data));

  };


  nitram.contactController = function(route, data) {
    // compile to intercept new links
    this.compile($('#mainView').html(data));
  };

  nitram.featuresController = function(route, data) {
    // compile to intercept new links
    this.compile($('#mainView').html(data));
  };


  nitram.helloWorldController = function(route, data) {
    // compile to intercept new links
    // $('#myTab a').tab('show');
    this.compile($('#mainView').html(data));

  };

  // ----------------------
  // Init
  // ----------------------

  nitram.init();

});