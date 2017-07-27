var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('preOrder', { title: 'Pre Order System' });
});

module.exports = router;