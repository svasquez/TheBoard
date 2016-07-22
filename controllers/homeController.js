(function (homeController) {
    var data = require("../data");
    homeController.init = function (app) {
        app.get("/", (req, res) => {
            data.getNoteCategories(function (err, results) {


                res.render("index", {
                    title: "The Board 2",
                    description: "This is from Server!!",
                    error: err,
                    categories: results,
                    catNameError : req.flash("catNameError")
                });
            });
        });

        app.get("/notes/:categoryName",function(req,resp){
            var categoryName = req.params.categoryName;
            resp.render("notes",{title : categoryName});

        });

        app.post("/newCategory", (req, res) => {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    //Handler error
                    req.flash("catNameError",err);
                    res.redirect("/");
                } else {
                    res.redirect("/notes/" + categoryName);
                }
            })
        });

    }
})(module.exports);