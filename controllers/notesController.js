(function (notesController) {
    var data = require("../data");
    notesController.init = function (app) {

        app.get("/api/notes/:categoryName", (req, res) => {
            var categoryName = req.params.categoryName;
            data.getNotes(categoryName, function (error, notes) {
                if (error) {

                } else {
                    res.set("Content-Type", "application/json");
                    res.send(notes.notes);
                }

            });
        });
    };
})(module.exports);