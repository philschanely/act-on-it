'use strict';

var config = require('./config.json');
var knex = require('knex')(config);

exports.bookshelf = require('bookshelf')(knex);