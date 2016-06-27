(function (homeController) {
    var data = require("../data");
    homeController.init = function (app) {
        app.get("/", (req, res) => {
        data.getNoteCategories(function (err,results) {
            
        
        res.render("index", { 
            title: "The Board 2" , 
            description : "This is from Server!!", 
            error:err,
            categories : results
        });
    });
});
}
})(module.exports);