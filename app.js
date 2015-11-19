'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');
var marked = require('marked');

var HTTPPORT = '9191';
var HTTPSPORT = '9192';

var app = express();
app.set('port', HTTPPORT);
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    var path = __dirname + '/README.md';
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        res.send(marked(data.toString()));
    });
});

function statusResponse(req, res) {
    res.status(req.params.responseStatus);
    res.json({
        method: req.method,
        statusCode: parseInt(req.params.responseStatus),
        requestHeaders: req.headers,
        body: req.body,
        query: req.query,
        ip: req.ip,
        originalUrl: req.originalUrl,
        path: req.path
    })
}

app.post('/status/:responseStatus', statusResponse);
app.put('/status/:responseStatus', statusResponse);
app.get('/status/:responseStatus', statusResponse);

app.get('/ip', (req, res) => {
    return res.send(`${req.ip}\n`);
});

app.get('/health', (req, res) => {
    return res.send("OK");
});

app.listen(HTTPPORT);
console.log(`Express HTTP server listening on port ${HTTPPORT}`);

var key = fs.readFileSync('key.pem');
var cert = fs.readFileSync('cert.pem');
var httpsServer = https.createServer({
    key: key,
    cert: cert
}, app);
httpsServer.listen(HTTPSPORT);
console.log(`Express HTTPS server listening on ${HTTPSPORT}`);

