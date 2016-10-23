/**
 * Created by pankaj on 20.10.16.
 */
angular.module('OneClickApp')


    .service('PiotrAndPawelService', function($http) {

        return {
            connectToPiotrPawelSearch:function(query){
                console.log("pp service", query)
            return $http.get("/piotrpawel/search/"+query)
            },
            getPPProductPage:function (productLink) {
                console.log("pp service l", productLink)
                return $http({
                    url:"/piotrpawel/product",
                    method:"POST",

                    data: {
                        link:productLink
                    }
                });
            }

        };

    })