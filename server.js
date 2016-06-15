var http = require("http");
var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.send("<html><body><h1>Express</h1></body></html>");
});

var server = http.createServer(app);

server.listen(3000);