/**
 * Created by pankaj on 29.09.16.
 */
angular.module('OneClickApp')
    .controller('loginCtrl', function ($scope, $rootScope, LoginService,$stateParams, $cookies) {
        $rootScope.employeeModel1={personalToken:"no user logged in"};
        console.log("in enter login controller");


        function login() {
            LoginService.login($stateParams.token).then(function (result) {
                console.log("in login controller",$stateParams.token);

              if(result.data._id){
                  $rootScope.employeeModel1=result.data;
              }else{
                  $rootScope.employeeModel1={personalToken:"no user logged in"};

              }
                console.log("empmodel",result.data)
                $cookies.put('sessionToken', result.data.token);

            })
        }
        login();
        /*$http.post('token/login', $scope.user).then(function (response) {
            console.log(response.data)
            $scope.message=response.data;
        });
*/

    });


