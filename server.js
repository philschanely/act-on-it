'use strict';

var Hapi = require('hapi'),
    server = new Hapi.Server();

server.connection({ host: '0.0.0.0', port: 8080, labels: ['api'] });

server.register([
    {
        register: require('./models/category'),
        options: {}
    }, require('vision'), require('inert'), require('./models/project'), require('./models/task') 
], function (err) {
    if (err) {
        console.log(err);
    } else {
        // set up templates
        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: './client/build'
        });

        server.route({
            method: 'GET',
            path: '/scripts/{param*}',
            handler: {
                directory: {
                    path: './client/build/scripts'
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/styles/{param*}',
            handler: {
                directory: {
                    path: './client/build/styles'
                }
            }
        });

        // set up routes for client
        server.route({
            method: 'GET',
            path: '/',
            handler: {
                view: 'index'
            }
        });

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: './client'
                }
            }
        });

        // start server
        server.start(function () {
            console.log('Server running');
        });
    }
});