var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var CatalogSchema   = new Schema({
    id : Number,
    catalogName: String,
    customerInterest: String
});

module.exports = mongoose.model('Catalog', CatalogSchema);