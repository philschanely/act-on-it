(function () {
    'use strict';
    
    angular.module('todo').controller('homeController', function (todoService) {
        var vm = this;
        
        vm.categories = [];
        
        var initialize = function () {
            todoService.getCategories().then(function (result) {
                vm.categories = result.data;
                vm.categories.forEach(function(o, i){
                    console.log("Retrieving projects for category: " + i.toString());
                    todoService.getCategoryProjects(o._id).then(function (result) {
                        console.log(result.data);
                        o.projects = result.data;
                    });
                });
            });
        };
        
        initialize();
    });
})();