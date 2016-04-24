'use strict';

var Task = require('./model').Task;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/api/tasks',
        handler: function (request, reply) {
            new Task().query({ orderBy: 'date_due' }).fetchAll().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });
    
    server.route({
        method: 'GET',
        path: '/api/tasks/in_category/{categoryId}',
        handler: function (request, reply) {
            new Task()
            .where({
                category: request.params.categoryId 
            }).fetchAll().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });
    
    server.route({
        method: 'GET',
        path: '/api/tasks/in_project/{projectId}',
        handler: function (request, reply) {
            new Task()
            .query({ 
                where: {"project": request.params.projectId }
            }).fetchAll().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/task/{taskId}',
        handler: function (request, reply) {
            new Task({'_id': request.params.taskId})
            .fetch()
            .then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/task',
        handler: function (request, reply) {
            
            /*
            new Category({
                'label': request.payload.label,
                'description': request.payload.description,
                'owner': request.payload.owner
            }).save().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
            */
        }
    });

    next();
};

exports.register.attributes = {
    name: 'Task'
};