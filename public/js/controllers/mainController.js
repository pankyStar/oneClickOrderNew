angular.module('OneClickApp')

    .controller('mainController', function($scope,$rootScope, Products, $stateParams, $sce, BasketService,
                                            $cookies,PiotrAndPawelService) {
        // $scope.formData = {};

      //  $scope.employeeModel1 = {}
        /*   Orders.getOrder()
         .success(function(data) {
         //  $scope.orders = data;
         });*/


         $scope.totalItems=0;

         $scope.basketItems={};
         $scope.sumPrice=0;
         $scope.totalAmount=0;
         $rootScope.pdbasket={};
         $rootScope.itemSum=0;


        $scope.passToMainBasket=function(pdbasket){
            console.log("pass to main basket",pdbasket)
            //make basket on basketitems page first using currentBasket type

        };
        $scope.searchInPiotrPawel=function () {
            PiotrAndPawelService.connectToPiotrPawelSearch($scope.querypp).then(function (result) {
                console.log("result ", result.data)
                $scope.ppSearchList=result.data.data.map(function (element) {
                    var product={
                        itemLink:element,
                        itemName: "",
                        itemPrice : "",
                        itemCurrency:"",
                        itemLink:element,
                        content:"",
                        isExpanded:false,
                        itemNumber:""
                    }
                    return product
                });

            });

        }

         $scope.getBasketItems=function(){
            console.log("main ctrl for basket items");
            // console.log(">>>>>>>>>>>>>>>>>>>>",BasketService.findAllItemsOfCurrentBasket())
            BasketService.findAllItemsOfCurrentBasket().then(function (result) {
               $scope.basketItems=result.data;
                var sum=0;
                for (var index in result.data) {
                    sum+=parseFloat(result.data[index].itemPrice);

                }
                $scope.sumPrice=sum;
                console.log("result bitems", result.data)

             });

        };

        $scope.searchInXKom = function () {
            Products.getSearchList($scope.query).then(function (result) {

                $scope.isProcessing = true;
                console.log("in controller after list is returned ", result.data);
                if(result.data.error){
                    $scope.errorOnSearch=result.data.error;
                }else {
                    console.log("here")
                    $scope.vSearchtList = result.data.data.map(function (element) {
                        var product={
                            itemName: "",
                            itemPrice : "",
                            itemCurrency:"",
                            itemLink:element,
                            content:"",
                            isExpanded:false,
                            itemNumber:""

                        };

                        return product;
                    });
                }

                console.log("link array >>>>>>>>>>>>>>>>>>>>>>>>>>   ", $scope.vSearchtList)
            });
        };

  /*      Products.getEmployee().then(function (result) {
            console.log("in getemp controller");
            //console.log(result.data[0]);
            $scope.employeeModel1 = result.data[0];

        }, function (reason) {
            console.log(reason);
        });*/
/*
        $scope.buyUsingLocalServer=function (productLink) {
            Products.buyFromXKom(productLink).then(function (result) {
                console.log("after buying from local server ->Xkom", result)
            })


        };*/

        $scope.showPreDefinedBasket=function (basket) {
            console.log("in show predef bskt", basket)
            $rootScope.pdbasket=basket;
            var sum = 0;
            for (var index in basket.items) {
                sum += parseFloat(basket.items[index].itemPrice);

            }
            $rootScope.itemSum=sum;
        };

        $scope.addItemToLocalBasket=function (item) {
        console.log("in add basket item to db",item)
        var itemMongodb={
                         itemName: item.itemName,
                            itemPrice : item.itemPrice,
                            itemLink: item.itemLink,
                             itemCurrency:item.itemCurrency,
                                itemNumber:item.itemNumber,

        };
            /*console.log("usersession", global.session[$cookies.get('sessionToken')])*/
            var x = parseInt(item.itemPrice, 10)
            $scope.totalItems+=1;
            $scope.totalAmount+=x;
            BasketService.addItem(itemMongodb);
        };

        $scope.getProductPageFromPP=function (item) {
            console.log("product to load",item.itemLink)
            PiotrAndPawelService.getPPProductPage(item.itemLink).then(function (result) {
                console.log("in controller after searching in from local browser pp", result.data);
                item.content=result.data.content;
                item.itemName=result.data.itemName;
                item.itemPrice=result.data.itemPrice;
                item.itemLink=result.data.itemLink;
                item.itemCurrency=result.data.itemCurrency
                item.itemNumber=result.data.itemNumber;
            })
        };

        $scope.sendLinktoServer = function (item) {
        console.log("item to search",item.itemLink)
               if(item.content.length>0){
                return;
            }
            Products.getProductPage(item.itemLink).then(function (result) {
                console.log("in controller after searching in from local browser ", result.data);

                item.content=result.data.content;
                item.itemName=result.data.itemName;
                item.itemPrice=result.data.itemPrice;
                item.itemLink=result.data.itemLink;
                item.itemCurrency=result.data.itemCurrency
                item.itemNumber=result.data.itemNumber;
            });
        };

        $scope.findAllpdBaskets=function () {
            console.log("find all baskets mainctrl" )
             BasketService.findAllpreDefinedBasket().then(function (res) {
                 console.log("returned from server baskets", res)
                 return  $scope.allBaskets=res;
             });

        };
        $scope.allBaskets=$scope.findAllpdBaskets();


        //console.log("allbaskets ",$scope.allBaskets)
      /*  $scope.saveBasket = function () {
            console.log("in maincontroller to create order");

            if ($scope.formData.text != undefined) {
                Products.create($scope.formData)
                    .success(function (data) {
                        // $scope.formData = {};
                        // $scope.orders = data;
                    });
            }
        };*/

        /*   $http.get("/loaddata").then(function (response) {

         console.log("loaddata response", response.data[0].id);

         $scope.employeeModel1=response.data[0];
         //$scope.employeeModel1=fn_load(response);
         //   console.log("in scope response", $scope.employeeModel1);
         //loadEmployeePage();
         });
         */



        $scope.deleteOrder = function (id) {
            Products.delete(id)

                .success(function (data) {
                    // $scope.orders = data;
                });
        };
    }).filter('to_trusted', ['$sce', function ($sce) {

    return function (text) {
        return $sce.trustAsHtml(text);
    }
}]);