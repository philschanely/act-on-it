(function(){
    angular.module('todo').directive('projectItem', function(){
       return {
           restrict: "E",
           templateUrl: "app/views/project/item.html",
           controller: function($scope){
               console.log("Project item loading...");
           }
       };
    });
})();