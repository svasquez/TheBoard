var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var auth = require("./auth");
//Setup the view engine
//app.set("view engine","jade");
//app.engine("ejs",ejsEngine); // supports master page
app.set("view engine","vash"); // vash view engine
//set the public static resource folder

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({
    secret: "VasquezTheBoard",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//use authentication
auth.init(app);

//Map the routes
controllers.init(app);
var server = http.createServer(app);

server.listen(3000);
var updater = require("./updater");
updater.init(server);