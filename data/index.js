(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    data.getNoteCategories = function (next) {
        next(null, seedData.initialNotes);
    };

    function seedDatabase() {
        database.getDb(function (err,db){
            if(err){
                console.log("Failed to seed database.");

            } else {
                //Test to see data exist
                 db.notes.count(function (err,count) {
                     if(err){
                        console.log("Failed to seed database. " + err);
                     } else {
                         if(count == 0){
                             console.log("Seeding database...");
                             seedData.initialNotes.forEach(function (item) {
                                 db.notes.insert(item,function (error) {
                                     if(error) console.log("Failed in insert item.");
                                 })
                             });
                             console.log("Data inserted.")
                         } else {
                             console.log("Database already seed");
                         }
                     }
                 });                   
            }

            //console.log("");

        });
    }

    seedDatabase();
})(module.exports);