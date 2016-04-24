'use strict';

var bookshelf = require('../../bookshelf').bookshelf;
var Project = require('../project/model').Project;

exports.Category = bookshelf.Model.extend({
    tableName: 'Category',
    projects: function() {
        return this.hasMany(Project, 'category');
    },
    getAll: function(params) {
        if (params != undefined 
            && params.loadProjects === true) {
            return this.query({ orderBy: 'label' }).fetchAll({ 
                withRelated: [{
                     projects: function(qb) {
                         qb.orderBy("label");
                     }
                }]
            });
        } else {
            return this.fetchAll();
        }
    }
});