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
            if ($routeParams.categoryId > 0) {
                todoService.getCategory($routeParams.categoryId).then(function (result) {
                    var data = result.data;
                    vm._id = data._id;
                    vm.label = data.label;
                    vm.description = data.description;
                    vm.owner = 1;
                });
            }
        };

        initialize();
    });
})();