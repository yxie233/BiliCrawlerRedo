var express = require('express');
var crawler = require('../bilibiliCrawler');

var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname, "..", '/views/index.html'));
  res.send("hi wl");
});

router.get('/update', function(req, res, next) {
    crawler.crawler_anim();
    res.send("updating");
});
module.exports = router;