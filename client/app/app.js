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
        .when('/test', {
            controller: 'testController',
            controllerAs: 'vm',
            templateUrl: 'app/pages/test/testTemplate.html'
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

function changeSelected($obj) {
    $('.selected').removeClass('selected');
    if ($obj) {
        $obj.addClass('selected');
    }
}

function sendToSnackbar(_msg, _class, _options) {
    console.log(_class + ": " + _msg);
}