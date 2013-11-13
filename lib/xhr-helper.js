//
// Condicional para requests XHR
//
// @param {Object} req
// @parem {Function} si
// @parem {Function} no
//
exports.isXHR = function(req, si, no) {
  if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
    si();
  } else {
    no();
  }
}