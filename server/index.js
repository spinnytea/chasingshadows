var express = require('express');
var config  = require('./config');

var app = express();
app.use(express.static(__dirname + '/../game'));

module.express = app;
var server = app.listen(config.port, function() {
    console.log('Listening on port ' + config.port);
});