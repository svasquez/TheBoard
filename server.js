var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");
var bodyParser = require('body-parser');
//Setup the view engine
//app.set("view engine","jade");
//app.engine("ejs",ejsEngine); // supports master page
app.set("view engine","vash"); // vash view engine

//set the public static resource folder
app.use(express.static(__dirname + "/public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
controllers.init(app);
var server = http.createServer(app);

server.listen(3000);