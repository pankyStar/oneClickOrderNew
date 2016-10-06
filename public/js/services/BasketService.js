/**
 * Created by pankaj on 05.10.16.
 */
angular.module("OneClickApp")
    .factory('Cart', function ($http) {
    return {

        addItem:function (item) {
            console.log(item)
            return $http.post(item);
        }
    }
})