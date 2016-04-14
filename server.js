'use strict';

var Hapi = require('hapi'),
    server = new Hapi.Server();

server.connection({ host: '0.0.0.0', port: 8080, labels: ['api'] });

server.register([
    {
        register: require('./category'),
        options: {}
    }, require('vision'), require('inert'), require('./project') 
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
            path: './client/app/views/'
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