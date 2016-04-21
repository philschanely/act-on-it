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
            getCategory: function (_id) {
                var d = $q.defer();
                $http.get('/api/category/' + _id).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            saveCategory: function (params) {
                var d = $q.defer();
                var url = params._id ? '/api/category/' + params._id : '/api/category';
                $http.post(url, params).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            getCategoryProjects: function (_id) {
                var d = $q.defer();
                $http.get('/api/project/in_category/' + _id).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            getTasks: function (params) {
                var d = $q.defer();
                $http.get('/api/tasks').then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            }
        };
    });
})();