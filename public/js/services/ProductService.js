angular.module('OneClickApp')


    .factory('Products', function($http) {
        return {

            getEmployee:function(){
                console.log("called service for employee");
                return $http.get('/:token/loaddata');
            },
            getSearchList:function ( query) {
                console.log('in get searchlist service');
                return $http.get("/:token/searchxk/"+query)
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
            buyFromXKom:function (items) {
                console.log("product",items);
                return $http({
                   url:"/buyfromXkom",
                    method:"POST",
                    data:{items:items}
                });
            }

        }
    });
