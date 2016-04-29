(function () {
    'use strict';

    angular.module('todo').factory('Task', function () {
        var Task = function (status, date_due, body) {
            this.status = status;
            this.date_due = date_due;
            this.body = body;
        };

        // public methods
        Task.prototype = {

        };

        // static methods
        Task.build = function (data) {
            if (data) {
                return new Task(
                    data.status,
                    data.date_due,
                    data.body
                );
            }
            return new Task();
        };

        Task.transformer = function (data) {
            if (angular.isArray(data)) {
                return data.map(Task.build);
            }
            return Task.build(data);
        };

        return Task;
    });
})();