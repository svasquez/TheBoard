var http = require("http");
var express = require("express");
var app = express();

//Setup the view engine
app.set("view engine","jade");

app.get("/", (req, res) => {
    //res.send("<html><body><h1>Express</h1></body></html>");
    res.render("jade/index", { title: "Express with Jade"});
});

var server = http.createServer(app);

server.listen(3000);