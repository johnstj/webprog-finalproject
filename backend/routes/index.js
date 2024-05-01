var express = require('express');
var router = express.Router();
var contact = require('../controllers/contact');
var rating = require('../controllers/rating');

/* POST new rating */
router.post('/rating/submitRating', function(req, res) {
  rating.storeRating(req, res);
});

/* POST contact form. */
router.post('/contact/submitForm', function(req, res) {
  contact.storeContact(req, res);
});

/* GET ratings by name. */
router.get('/searchName/:name', function(req, res) {
  rating.getRatingByName(req, res);
});

/* GET ratings by zipcode. */
router.get('/searchZipCode/:zipcode', function(req, res) {
  rating.getRatingByZip(req, res);
});

module.exports = router;
