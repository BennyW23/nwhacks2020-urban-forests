const path = require('path');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: "hello!"});
  res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = router;
