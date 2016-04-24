'use strict';

var bookshelf = require('../../bookshelf').bookshelf;
var Project = require('../project/model').Project;

exports.Task = bookshelf.Model.extend({
    tableName: 'Task',
    project: function() {
        return this.belongsTo(Project, 'project');
    }
});