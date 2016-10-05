/**
 * Created by pankaj on 29.09.16.
 */
angular.module('OneClickApp')
    .controller('loginCtrl', function ($scope, $http) {
        $scope.user={};

        $http.post('OneClickApp.com/:token/login', $scope.user).then(function (response) {
            $scope.message=response.data;
        });


    });


