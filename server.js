var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");

//Setup the view engine
//app.set("view engine","jade");
//app.engine("ejs",ejsEngine); // supports master page
app.set("view engine","vash"); // ejs view engine

controllers.init(app);
var server = http.createServer(app);

server.listen(3000);