angular.module('OneClickApp')


    .factory('Orders', function($http) {
        return {
            getOrder : function() {
                return $http.get('/api/orders');
            },
            create : function(todoData) {
                console.log("called OneClickOrders.js for create")
                return $http.post('/api/orders', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/orders/' + id);
            },
            getEmployee:function(){
                console.log("called service for employee");
                return $http.get('/loaddata');
            },
            getSearchList:function ( query) {
                console.log('in get serachlist service');
                return $http.get("/searchvirtualbrowser/:query")
            }
        }
    });
