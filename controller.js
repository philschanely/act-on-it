var List = require('./models/List'),
    Boom = require('boom'),
    _ = require('lodash');

exports.getList = {
    handler: function (request, reply) {
        List.findOne({ '_id': request.params.listId }, function (err, list) {
            if (!err) {
                reply(list);
            } else {
                reply(Boom.badImplementation(err));
            }
        });
    }
};

exports.getLists = {
    handler: function (request, reply) {
        List.find({}, function (err, lists) {
            if (!err) {
                reply(lists);
            } else {
                reply(Boom.badImplementation(err));
            }
        });
    }
};

exports.saveList = {
    handler: function (request, reply) {
        var newList = new List({
            name: _.kebabCase(request.payload.title),
            title: request.payload.title,
            description: request.payload.description,
            author: request.payload.author,
            items: request.payload.items || []
        });

        newList.save(function (err) {
            if (!err) {
                reply(newList._id);
            } else {
                reply(Boom.badImplementation(err));
            }
        });
    }
};