(function () {
    'use strict';

    angular.module('todo').controller('categoryEditController', function ($routeParams, $location, todoService) {
        var vm = this;

        vm._id = null;
        vm.label = '';
        vm.description = '';
        vm.owner = 1;

        vm.saveCategory = function () {
            // create/update record
            todoService.saveCategory({
                _id: vm._id,
                label: vm.label,
                description: vm.description,
                owner: vm.owner
            }).then(function (result) {
                console.log(result);
                $location.path('/');
            });
        };

        var initialize = function () {
            if ($routeParams.categoryId) {
                todoService.getCategory($routeParams.categoryId).then(function (result) {
                    vm._id = result._id;
                    vm.label = result.label;
                    vm.description = result.description;
                    vm.owner = 1;
                });
            }
        };

        initialize();
    });
})();