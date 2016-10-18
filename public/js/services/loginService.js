angular.module('OneClickApp')
    .factory('LoginService',function ($http) {
        return {
            login:function (link) {
                console.log("in login service private link",link);
                return $http.post("/"+link+"/login")
            }

        }
    }



)
