/**
 * Created by pankaj on 29.09.16.
 */
angular.module('OneClickApp')
    .controller('loginCtrl', function ($scope, LoginService) {
        $scope.user={};

        $scope.login=function (link) {
            LoginService.login(link).then(function (result) {
                console.log(result)
                $scope.user=result.data;
            })
        }
        /*$http.post('OneClickApp/:token/login', $scope.user).then(function (response) {
            console.log(response.data)
            $scope.message=response.data;
        });
*/

    });


