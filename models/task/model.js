'use strict';

var bookshelf = require('../../bookshelf').bookshelf;

exports.Project = bookshelf.Model.extend({
    tableName: 'Task'
});