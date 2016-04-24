'use strict';

var Category = require('./model').Category;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/api/category',
        handler: function (request, reply) {
            new Category().getAll({ loadProjects: true })
            .then(function (data) {
                console.log("Categories returned.");
                reply(data);
            }).catch(function (err) {
                console.log(err);
                reply(err);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/category/{categoryId}',
        handler: function (request, reply) {
            new Category()
            .where({ id: request.params.categoryId })
            .fetch({ withRelated: ['projects'] })
            .then(function (data) {
                reply(data);
            }).catch(function (err) {
                console.log(err);
                reply(err);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/category',
        handler: function (request, reply) {
            new Category().save({
                'label': request.payload.label,
                'owner': request.payload.owner
            }).then(function (data) {
                reply(data);
            }).catch(function (err) {
                console.log(err);
                reply(err);
            });
        }
    });
    
    server.route({
        method: 'PUT',
        path: '/api/category/{categoryId}',
        handler: function (request, reply) {
            new Category({ id: request.params.categoryId }).save({
                'label': request.payload.label,
                'owner': request.payload.owner
            }).then(function (data) {
                reply(data);
            }).catch(function (err) {
                console.log(err);
                reply(err);
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'Category'
};