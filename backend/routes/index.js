var express = require('express');
var router = express.Router();
var contact = require('../controllers/contact');
var rating = require('../controllers/rating');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET search restaurants page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search Restaurants' });
});

/* GET rating page. */
router.get('/rating', function(req, res, next) {
  res.render('rating', { title: 'Rate a Restaurant' });
});

/* POST new rating */
router.post('/rating/submitRating', function(req, res, next) {
  rating.storeRating(req, res);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send('');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST contact form. */
router.post('/contact/submitForm', function(req, res, next) {
  contact.storeContact(req, res);
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
