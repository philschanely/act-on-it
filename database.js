var Mongoose = require('mongoose'),
    db = Mongoose.connection;

Mongoose.connect('mongodb://dbuser:mylists@ds019829.mlab.com:19829/todo');

db.on('error', console.error.bind(console, 'connection-error'));
db.once('open', function () {
    console.log('Connection with database succeeded');
});

exports.Mongoose = Mongoose;
exports.db = db;