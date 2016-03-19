(function () {
    'use strict';
    
    angular.module('todo').controller('homeController', function (todoService) {
        var vm = this;
        
        vm.lists = [];
        
        var initialize = function () {
            todoService.getLists().then(function (result) {
                vm.lists = result.data;
            });
        };
        
        initialize();
    });
})();