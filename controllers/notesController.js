/// <reference path="../typings/globals/express/index.d.ts" />

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

        app.post("/api/notes/:categoryName",function(req,res) {
            var categoryName = req.params.categoryName;
            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author:"Smill Vásquez"
            }
            data.addNote(categoryName,noteToInsert,function(error){
                if (error) {
                    res.send(400,"Failed to add note to data store.");
                } else {
                    res.send(201,noteToInsert);
                    
                }

            });
        });
        
    };
})(module.exports);