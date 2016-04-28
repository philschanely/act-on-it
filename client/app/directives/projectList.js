(function(){
    angular.module('todo').directive('projectList', function(){
        return {
            replace:true,
            restrict: "E",
            templateUrl: "app/views/project/list.html",
            controller: function($scope){
               console.log("Project list loading...");
            }
        };
    });
})();