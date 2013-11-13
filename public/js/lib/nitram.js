define(['jquery', 'history'], function($) {
  'use strict';

  var A = {
    version: '0.0.1',
    routes: {},

    // on State change
    //   - e: event object
    onStateChange: function(e) {
      var state = History.getState(),
        data = state.data;
      // console.log('History statechange', state);
      A[data.controller](data.route, data.data, data.params);
    },

    // Intercepta request de links para hacer requests XHR en vez de
    //   recargar toda la página
    intercept: function(e) {
      A.route($(this).attr('href'));
      e.preventDefault();
    },

    // match route pattern
    matchRoute: function(route) {
      var i, patternSplit, pattern,
        routeSplit = route.split('/'),
        failed = false,
        found = false,
        params = {};

      for (pattern in A.routes) {
        patternSplit = pattern.split('/');
        if (routeSplit.length == patternSplit.length) {
          failed = false;
          for (i = 0; i < patternSplit.length; i++) {
            if (patternSplit[i][0] == ':' && patternSplit[i].length > 1) {
              params[patternSplit[i].substr(1)] = routeSplit[i];
            } else if (patternSplit[i] != routeSplit[i]) {
              params = {};
              failed = true;
              break;
            }
          }
          if (!failed) {
            found = pattern;
            break;
          }
        }
      }

      return {
        found: found,
        params: params
      };
    },

    // route
    route: function(route, replace) {
      var routeData, controller, callController,
        params = {};

      // defaults
      if (typeof replace == 'undefined') {
        replace = false;
      }

      // replace to true if we are on the same path
      replace = window.location.pathname == route | replace;

      // find route data
      routeData = A.routes[route];
      if (typeof routeData == 'undefined') {
        routeData = A.matchRoute(route);
        if (routeData.found !== false) {
          params = routeData.params;
          routeData = A.routes[routeData.found];
        } else {
          // silent error
          return;
        }
      }

      // get controller
      controller = routeData.controller;

      // route data defautls
      if (typeof routeData.req == 'undefined') {
        routeData.req = true;
      }

      // call controller
      callController = function(data) {
        var f = replace ? 'replaceState' : 'pushState';

        if (History.enabled) {
          // Push state
          History[f]({
            controller: controller,
            route: route,
            data: data,
            params: params
          }, routeData.title, route);

          // Call controller directly when replacing the state
          if (replace) {
            A[controller](route, data, params);
          }
        } else {
          A[controller](route, data, params);
        }
      };

      // GET
      if (routeData.req) {
        $.ajaxSetup({
          cache: false
        });
        $.get(route, function(data, textStatus, jqXHR) {
          callController(data);
        })
        // hacer algo con el error, o no es necesario?
        .fail(function() {});
      } else {
        callController(null);
      }
    },

    // compile
    compile: function($el) {
      if (typeof el == 'undefined') {
        $el = $(document);
      }

      // link interceptor
      $el.find('a[data-xhr]').unbind('click').click(A.intercept);

      // backs
      $el.find('.back').unbind('click').click(History.back);
    },

    // ----------------------
    // Init
    // ----------------------

    // App init
    init: function() {

      // history events
      History.Adapter.bind(window, 'statechange', A.onStateChange);

      // initial compilation
      A.compile();

      // route
      A.route(window.location.pathname, true);
    }
  };

  return A;
});