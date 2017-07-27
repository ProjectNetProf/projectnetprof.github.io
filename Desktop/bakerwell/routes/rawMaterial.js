var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rawMaterial', { title: 'Raw Materials System' });
});

module.exports = router;