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
  res.send();
});

router.post('/login', function(req, res, next) {
  const user = 
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next(); 
  }
  else {
    res.sendStatus(403);
  }
}

module.exports = router;
