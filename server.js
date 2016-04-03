'use strict';

var Hapi = require('hapi'),
    server = new Hapi.Server();

server.connection({ host: '127.0.0.1', port: 8080, labels: ['api'] });

server.register([
    {
        register: require('./category'),
        options: {}
    }, require('vision'), require('inert')
], function (err) {
    if (err) {
        console.log(err);
    } else {
        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: './templates'
        });

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

        server.start(function () {
            console.log('Server running');
        });
    }
});