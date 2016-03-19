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
                templateUrl: 'app/pages/homeTemplate.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .value('$', window.$);
})();