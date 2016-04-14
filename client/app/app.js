(function () {
    'use strict';

    var app = angular.module('todo', [
        'ngSanitize',
        'ngRoute'
    ]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'homeController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home.html'
            })
            .when('/category/edit/:categoryId', {
                controller: 'categoryEditController',
                controllerAs: 'vm',
                templateUrl: 'app/views/category/edit.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .value('$', window.$);
})();