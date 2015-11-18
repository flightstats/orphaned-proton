'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var PORT = '9191';

var app = express();
app.set('port', PORT);
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({extended: true}));

function statusResponse(req, res){
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

var server = app.listen(PORT, function () {
    console.log("Express server listening on port " + app.get('port'));
});
