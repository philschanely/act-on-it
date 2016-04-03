(function () {
    'use strict';

    angular.module('todo').service('todoService', function ($q, $http) {
        return {
            getCategories: function () {
                var d = $q.defer();
                $http.get('/api/category').then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            saveCategory: function (params) {
                var d = $q.defer();
                $http.post('/api/category', params).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            }
        };
    });
})();