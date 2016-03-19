(function () {
    'use strict';

    angular.module('todo').service('todoService', function ($q, $http) {
        return {
            getLists: function () {
                var d = $q.defer();
                $http.get('/api/lists').then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            saveList: function (params) {
                var d = $q.defer();
                $http.post('/api/list', params).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            }
        };
    });
})();