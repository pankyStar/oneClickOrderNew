var mongoose = require('mongoose');

module.exports = mongoose.model('Baskets', {
    items:{},
    createdBySession:{},
    basketName:String,
    dateCreated:String,
    preDefined:Boolean,
    type:String
});