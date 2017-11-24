var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var CustomerSchema   = new Schema({
    id : Number,
    name: String,
    place: String
});

module.exports = mongoose.model('Customer', CustomerSchema);