/**
 * Created by pankaj on 05.10.16.
 */


angular.module('OneClickApp')


    .service('BasketService', function($http) {
        return {
            addItem: function (item) {
                console.log("in basket service add item", item)
                return $http({
                    url: "/basket/items",
                    method: "POST",
                    data: {
                        itemToDb: item
                    }
                })
            },
            deleteAllItemsOfMainBasket: function () {
                return $http.delete('/basket/main');
            },
            deleteAnItemOfMainBasket: function (id) {
                return $http.delete('/basket/main/'+id);
            },
            findAllItemsOfCurrentBasket: function () {
                console.log("find all products for current day")
                return $http.get('/basket/items')
            },
            saveBasket: function (items,basketName,preDefinedStatus) {

                console.log("basket name to create bskt",basketName)
                return $http({
                    url: "/basket/save",
                    method: "POST",
                    data: {
                        basket: items,
                        name:basketName,
                        preDefined:preDefinedStatus
                    }

                })
            },
            findAllpdBaskets: function () {
                console.log("find all baskets service")
                return $http.get('/baskets/all')
            },
            findAllItemsOftheBasket:function(basketName){
                console.log("find all items of the basket");
                return $http.get('/basket/'+basketName+'/items')
            },
            findAllpreDefinedBasket:function () {
                console.log("find all baskets service")
                return $http.get('/baskets/predef')
            }

         };



               /*getOrder : function() {
                            return $http.get('/api/orders');
                        },*/
                     /*   create : function(item) {
                            console.log("called ProductService.js for create")
                            return $http.post('/oneClickApp/items', item);
                        },*/

            })


