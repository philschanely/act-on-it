'use strict';

var Category = require('./model').Category;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/api/category',
        handler: function (request, reply) {
            new Category().fetchAll().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/category/{categoryId}',
        handler: function (request, reply) {
            new Category({'_id': request.params.categoryId}).fetch().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/category',
        handler: function (request, reply) {
            new Category({
                'label': request.payload.label,
                'description': request.payload.description,
                'owner': request.payload.owner
            }).save().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'Category'
};