(function (homeController) {
    var data = require("../data");
    homeController.init = function (app) {
        app.get("/", (req, res) => {
        data.getNoteCategories(function (err,results) {
            
        
        res.render("index", { 
            title: "Express with Vash" , 
            description : "This is from Server!!", 
            error:err,
            categories : results
        });
    });
});
}
})(module.exports);