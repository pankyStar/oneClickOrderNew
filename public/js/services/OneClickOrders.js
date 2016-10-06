angular.module('OneClickApp')


    .factory('Orders', function($http) {
        return {
            /*getOrder : function() {
                return $http.get('/api/orders');
            },*/
            create : function(todoData) {
                console.log("called OneClickOrders.js for create")
                return $http.post('/api/orders', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/orders/' + id);
            },
            getEmployee:function(){
                console.log("called service for employee");
                return $http.get('/oneClickApp/:token/loaddata');
            },
            getSearchList:function ( query) {
                console.log('in get searchlist service');
                return $http.get("/oneClickApp/:token/searchvirtualbrowser/"+query)
            },
            getProductPage:function (productLink) {

                console.log("in getproductpage service method");
                return $http({
                    url:"/oneClickApp/callServerForProduct",
                    method:"POST",
                    data:{link:productLink}

                });

            },
            buyFromXKom:function (productLink) {
                console.log("product",productLink);
                return $http({
                   url:"/buyfromXkom",
                    method:"POST",
                    data:{link:productLink}
                });
            }

        }
    });
