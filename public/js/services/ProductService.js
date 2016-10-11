angular.module('OneClickApp')


    .factory('Orders', function($http) {
        return {

            getEmployee:function(){
                console.log("called service for employee");
                return $http.get('/oneClickApp/:token/loaddata');
            },
            getSearchList:function ( query) {
                console.log('in get searchlist service');
                return $http.get("/oneClickApp/:token/searchxk/"+query)
            },
            getProductPage:function (productLink) {

                console.log("in get product page service method", productLink);
                return $http({
                    url:"/product",
                    method:"POST",

                    data: {
                        link:productLink
                    }
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
