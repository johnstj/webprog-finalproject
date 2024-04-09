var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST new account */
router.post('/createUser', function(req, res, next) {
  user.storeRating(req, res);
});

module.exports = router;
