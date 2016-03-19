var Hapi = require('hapi'),
    Routes = require('./routes');

require('./database');

var server = new Hapi.Server();

server.register([require('vision'), require('inert')], function (err) {
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './templates'
    });
});

server.connection({
    host: '127.0.0.1',
    port: 8080
});

server.route(Routes.endpoints);

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});