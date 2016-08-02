(function(angular) {
    var theModule = angular.module("notesView",["ui.bootstrap"]);
    
    theModule.controller("notesViewController",
    ["$scope","$window","$http",
     function ($scope,$window,$http) {
         $scope.notes = [];
         $scope.newNotes = createBlankNote();
        var urlParts = $window.location.pathname.split("/");
        var categoryName = urlParts[urlParts.length - 1];
        var notesUrl = "/api/notes/" + categoryName;
        $http.get(notesUrl)
        .then(function (result) {
            //Success
            $scope.notes = result.data;
        }, function (error) {
            alert(error);
        })

        $scope.save = function () {
            $http.post(notesUrl,$scope.newNotes)
            .then(function(result) {
                //success
                $scope.notes.push(result.data);
                $scope.newNotes = createBlankNote();
            },
            function (error) {
                alert(error);
            });
        };

        function createBlankNote() {
            return {
             note: "",
             color: "yellow"
         }
        };
    }]);
})(window.angular);