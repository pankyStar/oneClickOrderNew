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
                return $http.get('/oneClickApp.com/:token/loaddata');
            },
            getSearchList:function ( query) {
                console.log('in get searchlist service');
                return $http.get("/oneClickApp.com/:token/searchvirtualbrowser/"+query)
            },
            getProductPage:function (productLink) {
                console.log(productLink);
                console.log("in getproductpage service method");
                return $http({
                    url:"/oneClickApp.com/callServerForProduct",
                    method:"POST",
                    data:{link:productLink}

                });
               /* return $http.get("/oneClickApp.com/callServerForProduct")
                    .success(function (data, status, header, config) {
                        console.log("success",data,status,header,config)
                }).error(function (data, status, header, config) {
                        console.log(data,status,header,config)
                    })*/
            }


        }
    });
