/**
 * Created by pankaj on 22.09.16.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Item', {

    itemName: String,
    itemPrice : String,
    itemLink: String,
    itemCurrency:String,
    userSession:{},
    dateCreated:String,
    itemNumber:String,
    fromBasket:String


});