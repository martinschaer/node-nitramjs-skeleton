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
    '/helloworld/:id': {
      controller: 'helloWorldController',
      title: 'Hello World',
      req: false,
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
    $('#false').hide();
    this.compile($('#mainView').html(data));

    // $('body').css({
    //   backgroundColor: 'red'
    // });

    // nitram.onRouteChange = function() {
    //   $('body').css({
    //     backgroundColor: '#fff'
    //   });
    // };
  };


  nitram.contactController = function(route, data) {
    // compile to intercept new links
    $('#false').hide();
    this.compile($('#mainView').html(data));
  };

  nitram.featuresController = function(route, data) {
    // compile to intercept new links
    $('#false').hide();
    this.compile($('#mainView').html(data));
  };


  nitram.helloWorldController = function(route, data, param) {
    $('#mainView').empty()
    console.log(param.id);
    $('#false').show();
    $('#myTab li').removeClass('active').eq(param.id - 1).addClass('active');
    $('.tab-content div').removeClass('active').eq(param.id - 1).addClass('active');
  };

  // ----------------------
  // Init
  // ----------------------

  nitram.init();

});