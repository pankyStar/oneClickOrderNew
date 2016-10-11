angular.module('OneClickApp')
    .factory('LoginService',function ($http) {
        return {
            login:function (link) {
                console.log("in login service",link);
                $http.post('OneClickApp/:token/login',link)
            }

        }
    }



)