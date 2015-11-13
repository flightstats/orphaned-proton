'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');

var HTTPPORT = '9191';
var HTTPSPORT = '9192';

var app = express();
app.set('HTTPPORT', HTTPPORT);
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({extended: true}));

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(HTTPSPORT);

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

var server = app.listen(HTTPPORT, function () {
    console.log("Express HTTP server listening on HTTPPORT " + app.get('HTTPPORT'));
    console.log("Express HTTPs server listening on HTTPSPORT " + app.get('HTTPSPORT'));
});
