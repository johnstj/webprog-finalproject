var express = require('express');
var router = express.Router();
var contact = require('../controllers/contact');

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

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST contact form. */
router.post('/contact/submitForm', function(req, res, next) {
  contact.storeContact(req, res);
  //res.render('contact', { title: 'Contact' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
