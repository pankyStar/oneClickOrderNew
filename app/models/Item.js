/**
 * Created by pankaj on 22.09.16.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Item', {
    itemName: String,
    itemPrice : Number,
    itemLink: String

});