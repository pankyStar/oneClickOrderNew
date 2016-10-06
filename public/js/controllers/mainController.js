angular.module('OneClickApp')

    .controller('mainController', function ($scope, Orders, $stateParams,$sce,Cart) {
        // $scope.formData = {};

        $scope.employeeModel1 = null
        /*   Orders.getOrder()
         .success(function(data) {
         //  $scope.orders = data;
         });*/
         $scope.

        $scope.test = function () {
            Orders.getSearchList($scope.query).then(function (result) {

                $scope.isProcessing = true;
                console.log("in controller after searching in from local browser ", result.data.data);
                $scope.vSearchtList = result.data.data.map(function (element) {
                    var product={
                        name:"",
                        link:element,
                        content:"",
                        isExpanded:false
                    };

                    return product;
                });
            });
        };

        Orders.getEmployee().then(function (result) {
            console.log("in getemp controller");
            //console.log(result.data[0]);
            $scope.employeeModel1 = result.data[0];
        }, function (reason) {
            console.log(reason);
        });

        $scope.buyUsingLocalServer=function (productLink) {
            Orders.buyFromXKom(productLink).then(function (result) {
                console.log("after buying from local server ->Xkom", result)
            })


        };

        $scope.addItemToLocalBasket=function (item) {

        Cart.addItem(item);
        }
        $scope.sendLinktoServer = function (item) {
               if(item.content.length>0){
                return;
            }
            Orders.getProductPage(item.link).then(function (result) {
                console.log("in controller after searching in from local browser ");

                item.content=result.data;
            });
        };


        $scope.createOrder = function () {
            console.log("in maincontroller to create order");

            if ($scope.formData.text != undefined) {
                Orders.create($scope.formData)
                    .success(function (data) {
                        // $scope.formData = {};
                        // $scope.orders = data;
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

        function loadEmployeePage() {
            //var doc = jsdom.jsdom("./public/index.html");
            console.log("doc ", document);
            /*document.getElementById("emp_content").innerHTML=<div ng-include="'/app/views/EmployeeHomePage.html'" ng-if="employeeModel1"></div>/;*/

        }


        $scope.deleteOrder = function (id) {
            Orders.delete(id)

                .success(function (data) {
                    // $scope.orders = data;
                });
        };
    }).filter('to_trusted', ['$sce', function ($sce) {

    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);