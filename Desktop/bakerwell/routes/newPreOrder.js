var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newPreOrder', { title: 'Pre Order System' });
});

module.exports = router;