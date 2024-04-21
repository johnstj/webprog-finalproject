var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST new account */
router.post('/createUser', function(req, res) {
  user.storeUser(req, res);
});

/* POST login to account */
router.post('/login', function(req, res) {
  user.checkUser(req, res);
});

module.exports = router;
