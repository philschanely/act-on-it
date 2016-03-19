var Mongoose  = require('mongoose'),
    Schema = Mongoose.Schema,
    Shortid = require('shortid');

var ListSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: Shortid.generate
    },
    name: String, // internal
    title: String, // external
    description: String,
    author: String,
    items: Array
});

var List = Mongoose.model('List', ListSchema);

module.exports = List;