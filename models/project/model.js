'use strict';

var bookshelf = require('../../bookshelf').bookshelf;
var Category = require('../category/model').Category;
var Task = require('../task/model').Task;

exports.Project = bookshelf.Model.extend({
    tableName: 'Project',
    category: function(){
        return this.belongsTo(Category, 'category');
    }, 
    tasks: function(){
        return this.hasMany(Task, 'project');
    }
});