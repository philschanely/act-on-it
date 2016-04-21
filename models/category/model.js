'use strict';

var bookshelf = require('../../bookshelf').bookshelf;

exports.Category = bookshelf.Model.extend({
    tableName: 'Category'
});