var express = require('express');
var router = express.Router();

/* GET users listing. */

var isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}


module.exports = router;

module.exports = function(passport) {
  router.get('/', isLoggedIn, function(req, res) {
    res.render('dashboard', { title: 'Dashboard' });
  });

  return router;

}