(function(){
    angular.module('todo').directive('brand', function(){
       return {
           replace:true,
           restrict: "E",
           templateUrl: "app/views/brand.html",
           controller: function($scope){
               
           }
       };
    });
})();