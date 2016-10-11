/**
 * Created by pankaj on 05.10.16.
 */


angular.module('OneClickApp')


    .service('BasketService', function($http) {
        return {
            addItem:function (item) {
                        console.log("in basket service", item)
                        return $http({ url:"/oneClickApp/basket/items",
                                                         method:"POST",
                                                         data: {
                                                             itemToDb: item
                                                         }
                                                     })
                    },
                    delete : function(id) {
                         return $http.delete('/oneClickApp/basket/item/' + id);
                            },
            findAll:function () {
                                console.log("find all products for current day")
                            return $http.get('/oneClickApp/basket/items')
            }
        }




               /*getOrder : function() {
                            return $http.get('/api/orders');
                        },*/
                     /*   create : function(item) {
                            console.log("called ProductService.js for create")
                            return $http.post('/oneClickApp/items', item);
                        },*/

            })


