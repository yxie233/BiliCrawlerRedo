
var express = require('express');


var app = express();
var index = require('./routes/index');



app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});

app.use('/', index);

module.exports = app;