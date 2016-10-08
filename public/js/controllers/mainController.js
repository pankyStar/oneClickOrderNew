angular.module('OneClickApp')

    .controller('mainController', function ($scope, Orders, $stateParams,$sce, BasketService) {
        // $scope.formData = {};

        $scope.employeeModel1 = null
        /*   Orders.getOrder()
         .success(function(data) {
         //  $scope.orders = data;
         });*/
         $scope.totalPrice=function(){

         }

         $scope.totalItems=0;
         $scope.basketItems=null;
         $scope.totalAmount=0;

         $scope.getBasketItems=function(){
            console.log("main ctrl for basket items");
            // console.log(">>>>>>>>>>>>>>>>>>>>",BasketService.findAll())
            BasketService.findAll().then(function (result) {
                $scope.basketItems=result.data;
                console.log("bitems", result.data)
             });

        };

        $scope.searchInXKom = function () {
            Orders.getSearchList($scope.query).then(function (result) {

                $scope.isProcessing = true;
                console.log("in controller after list is returned ", result.data);
                $scope.vSearchtList = result.data.data.map(function (element) {
                    var product={
                        itemName: "",
                        itemPrice : "",
                        itemCurrency:"",
                        itemLink:element,
                        content:"",
                        isExpanded:false

                    };

                    return product;
                });
                console.log("link array >>>>>>>>>>>>>>>>>>>>>>>>>>   ", $scope.vSearchtList)
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
        console.log("in add basket item to db",item)
        var itemMongodb={
                         itemName: item.itemName,
                            itemPrice : item.itemPrice,
                            itemLink: item.itemLink,
                             itemCurrency:item.itemCurrency
        };
            var x = parseInt(item.itemPrice, 10)
            $scope.totalItems+=1;
            $scope.totalAmount+=x;
        BasketService.addItem(itemMongodb);
        };

        $scope.sendLinktoServer = function (item) {
        console.log("item to search",item.itemLink)
               if(item.content.length>0){
                return;
            }
            Orders.getProductPage(item.itemLink).then(function (result) {
                console.log("in controller after searching in from local browser ", result.data);

                item.content=result.data.content;
                item.itemName=result.data.itemName;
                item.itemPrice=result.data.itemPrice;
                item.itemLink=result.data.itemLink;
                item.itemCurrency=result.data.itemCurrency
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