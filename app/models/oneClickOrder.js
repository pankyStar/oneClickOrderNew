/**
 * Created by pankaj on 22.09.16.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
    text : String,
    done : Boolean
});