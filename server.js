var http = require("http");
var express = require("express");
var app = express();
var ejsEngine = require("ejs-locals");

//Setup the view engine
//app.set("view engine","jade");
app.engine("ejs",ejsEngine); // supports master page
app.set("view engine","ejs"); // ejs view engine

app.get("/", (req, res) => {
    //res.send("<html><body><h1>Express</h1></body></html>");
    res.render("ejs/index", { title: "Express with allalalalalallalalalalal"});
});

var server = http.createServer(app);

server.listen(3000);