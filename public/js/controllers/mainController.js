angular.module('OneClickApp')

    .controller('mainController', function($scope, Orders,$stateParams) {
        $scope.formData = {};
        $scope.employeeModel1=null
        Orders.getOrder()
            .success(function(data) {
                $scope.orders = data;
            });
        Orders.getEmployee().then(function (result) {
            console.log("in getemp controller")
            console.log(result.data[0]);
            $scope.employeeModel1=result.data[0];
        }, function (reason) {
            console.log(reason)
        });
        Orders.getSearchList().then(function (result) {
        console.log("in controller to get search list from virtual browser");
            $scope.searchQuery=$stateParams.query
            $scope.vSearchtList=result.data;
        });

        $scope.createOrder = function() {
            console.log("in maincontroller to create order")

            if ($scope.formData.text != undefined) {
                Orders.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        $scope.orders = data;
                    });
            }
        };

     /*   $http.get("/loaddata").then(function (response) {

            console.log("loaddata response", response.data[0].id);

            $scope.employeeModel1=response.data[0];
            //$scope.employeeModel1=fn_load(response);
         //   console.log("in scope response", $scope.employeeModel1);
             //loadEmployeePage();
        });
*/

        function loadEmployeePage(){
            //var doc = jsdom.jsdom("./public/index.html");
            console.log("doc ",document);
            /*document.getElementById("emp_content").innerHTML=<div ng-include="'/app/views/EmployeeHomePage.html'" ng-if="employeeModel1"></div>/;*/

        }

        function fn_load(response){

            console.log("fn_load");
                for(let i=0;i<response.data.length;i++){
                    // console.log("resdata",response.data[i].personalLink);
                    if(response.data[i].personalLink==window.location.href){
                        console.log("match")
                        return response.data[i];
                    } else {
                        console.log("no match")
                    }
                }
        }

        $scope.deleteOrder = function(id) {
            Orders.delete(id)

                .success(function(data) {
                    $scope.orders = data;
                });
        };
    });