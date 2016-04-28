(function(){
    angular.module('todo').directive('categoryList', function(){
        return {
            restrict: "E",
            templateUrl: "app/views/category/list.html",
            controller: function($scope){

                this.initialize = function() {
                    console.log('Category list loaded');
                };
                
                this.initialize();
            }
        };
    });
})();