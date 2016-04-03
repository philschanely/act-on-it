(function () {
    'use strict';
    
    angular.module('todo').controller('homeController', function (todoService) {
        var vm = this;
        
        vm.categories = [];
        
        var initialize = function () {
            todoService.getCategories().then(function (result) {
                vm.categories = result.data;
            });
        };
        
        initialize();
    });
})();