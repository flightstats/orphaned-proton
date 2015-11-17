'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var HTTPPORT = '9191';
var HTTPSPORT = '9192';

var app = express();
app.set('HTTPPORT', HTTPPORT);
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({extended: true}));

// This expects a /key.pem and /cert.pem file placed in the app.js root. 
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

var server = app.listen(PORT, function () {
    console.log("Express server listening on port " + app.get('port'));
});
