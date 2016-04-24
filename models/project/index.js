'use strict';

var Project = require('./model').Project;

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/api/project',
        handler: function (request, reply) {
            /*
            new Category().fetchAll().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
            */
        }
    });
    
    server.route({
        method: 'GET',
        path: '/api/project/in_category/{categoryId}',
        handler: function (request, reply) {
            new Project()
            .query({ 
                where: {"category": request.params.categoryId }
            }).fetchAll().then(function (data) {
                reply(data);
            }).catch(function (err) {
                reply(err);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/project/{projectId}',
        handler: function (request, reply) {
            new Project()
            .where({ id: request.params.projectId })
            .fetch({ withRelated: [{
                    tasks: function(qb) {
                         qb.orderBy("date_due");
                     }
                }]
            }).then(function (data) {
                reply(data);
            }).catch(function (err) {
                console.log(err);
                reply(err);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/project',
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
    name: 'Project'
};