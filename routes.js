var Controller = require('./controller');

exports.endpoints = [
    {
        method: 'GET',
        path: '/',
        handler: {
            view: 'index'
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './client'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/lists',
        config: Controller.getLists
    },
    {
        method: 'POST',
        path: '/api/list',
        config: Controller.saveList
    }
];