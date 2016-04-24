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
            getCategory: function (category_id) {
                var d = $q.defer();
                $http.get('/api/category/' + category_id).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            getCategoryProjects: function (category_id) {
                var d = $q.defer();
                $http.get('/api/project/in_category/' + category_id).then(function (data) {
                    d.resolve(data);
                });
                return d.promise;
            },
            getProject: function (project_id) {
                var d = $q.defer();
                $http.get('/api/project/' + project_id).then(function (data) {
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
            },
            saveCategory: function (params) {
                var d = $q.defer();
                if (params.id) {
                    $http.put('/api/category/' + params.id, params).then(function (data) {
                        d.resolve(data);
                    });
                } else {
                    $http.post('/api/category', params).then(function (data) {
                        d.resolve(data);
                    });
                }
                return d.promise;
            }
        };
    });
})();