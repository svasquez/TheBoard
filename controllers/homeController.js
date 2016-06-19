(function (homeController) {
    homeController.init = function (app) {
        app.get("/", (req, res) => {
    //res.send("<html><body><h1>Express</h1></body></html>");
           res.render("index", { title: "Express with Vash" , description : "This is from Server!!"});
    });
}
})(module.exports);