var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('kitchenOrder', { title: 'Kitchen Order System' });
});

module.exports = router;