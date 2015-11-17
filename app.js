'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var marked = require('marked');

var PORT = '9191';

var app = express();
app.set('port', PORT);
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  var path = __dirname + '/README.md';
  var file = fs.readFile(path, 'utf8', function(err, data) {
      console.log(err);
    }
    res.send(marked(data.toString()));
  });
});

app.get('/status/:responseStatus', (req, res) => {
    res.status(req.params.responseStatus);
    res.json({
        statusCode: parseInt(req.params.responseStatus),
        requestHeaders: req.headers,
        ip: req.ip,
        originalUrl: req.originalUrl,
        path: req.path

    });
});

app.get('/ip', (req, res) => {
   return res.send(`${req.ip}\n`);
});

app.get('/health', (req, res) => {
    return res.send("OK");
});

var server = app.listen(PORT, function () {
    console.log("Express server listening on port " + app.get('port'));
});
