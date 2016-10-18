angular.module('OneClickApp')
    .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
        console.log("in router conf");
        $urlRouterProvider.otherwise("EmpHome");
        $locationProvider.html5Mode({
            enabled:true,
            requireBase:false
        });
        $stateProvider
            .state({
                name: 'Template',
                url: '/',
                templateUrl: '../templates/template.html'
            })
            .state({
                name: 'EmpHomePage',
                url: 'emp',
                templateUrl: '../templates/EmployeeHomePage.html',
                controller: 'mainController'

            })
            .state({
                name: 'EmpHomePage.search',
                url: '/search'
            })

            .state({
                name:'preDefinedBasket',
                url:'/predefinedbasket/items',
                templateUrl:'../templates/PreDefinedBasket.html'
            })
            .state({
                name: "mainBasket",
                url: "/basket/main",
                templateUrl: '../templates/BasketItems.html',
                controller: function main(BasketService, $scope, Products,$location) {
                         BasketService.findAllItemsOfCurrentBasket().then(function (result) {
                            console.log(" cntl in ui router get items", result.data)
                            var sum = 0;
                            for (var index in result.data) {
                                sum += parseFloat(result.data[index].itemPrice);

                            }
                            $scope.sumPrice = sum;
                            $scope.basketItems = result.data;
                        });

                    $scope.emptyBasket=function (basketItems) {
                        if(basketItems.length<=0){
                            $scope.deleted="The basket is already empty"
                        }
                        else{
                            BasketService.deleteAllItemsOfMainBasket().then(function (result) {
                                console.log("res",result.data)
                                $scope.deleted="Main Basket was deleted, refresh to see effect"
                            });
                        }

                    };
                    $scope.placeOrder = function (items) {
                        console.log("items", items)
                        //BasketService.saveBasket(items); replace if already created with same name
                        if(items.length<=0){
                            console.log("empty bskt")
                            $scope.emptyBasketWarn="The basket is empty"
                        }else{
                            Products.buyFromXKom(items).then(function (result) {
                                console.log("after buying from local server ->Xkom", result)
                            })

                        }

                    };

                    $scope.deleteAnitem=function (item) {
                        console.log("delete it",item);
                        var index = $scope.basketItems.indexOf(item);
                        $scope.basketItems.splice(index, 1)
                        var arr=eval($scope.basketItems);
                        var sum = 0;
                        console.log("here",arr)
                        if(arr.length<=0){
                            console.log("here")
                            $scope.sumPrice=0;
                        }else{
                            for (var i in arr) {
                                sum += parseFloat(arr[i].itemPrice);

                            }
                            $scope.sumPrice=sum;
                        }

                        console.log("sum",sum)

                        BasketService.deleteAnItemOfMainBasket(item._id).then(function (result) {
                            console.log("deleted",result.data)
                        });

                    }

                    $scope.saveBasket = function (items) {

                        if(items.length<=0){
                            $scope.saved="Basket  can not be empty. Put some items."
                        }else {

                            console.log("call service to save basket")
                            BasketService.saveBasket(items, $scope.basketName,$scope.basketStatus).then(function (result) {
                                console.log("result", result);
                                $scope.saved = "Basket was saved"
                            })

                        }


                    };
                    }

            })
            .state({
                name: "basket",
                url: "/basket?pdBasketName=pdBasket",
                templateUrl: '../templates/BasketItems.html',

                controller: function (BasketService, $scope, Products,$location) {


                        // create different links for both functionality
                        BasketService.findAllItemsOftheBasket(  $location.search().pdBasketName )
                            .then(function (result) {
                            console.log("found basket items", result.data[0].items);
                            var items=result.data[0].items;
                             for(let i=0; i< items.length;i++){
                             console.log("here i")
                            // items[i].fromBasket= $location.search().pdBasketName
                             BasketService.addItem(items[i]);
                             }
                            console.log("hhhhhhhhhhhhhhhh777777777777777777777777777777777")
                            BasketService.findAllItemsOfCurrentBasket().then(function (result) {
                                console.log(" cnt in ui router get items", result.data)
                                //this.basketItems=result.data
                                /*for(let i=0; i< items.length;i++){
                                    console.log("here i")
                                    result.data.push(items[i]);
                                }*/
                                var sum = 0;
                                for (var index in result.data) {
                                    sum += parseFloat(result.data[index].itemPrice);

                                }

                                $scope.sumPrice = sum;
                                $scope.basketItems = result.data;

                            });
                        });
                    $scope.emptyBasket=function (basketItems) {
                        if(basketItems.length<=0){
                            $scope.deleted="The basket is already empty"
                        }
                        else{
                            BasketService.deleteAllItemsOfMainBasket().then(function (result) {
                                console.log("res",result.data)
                                $scope.deleted="Main Basket was deleted, refresh to see effect"
                            });
                        }

                    };
                    $scope.placeOrder = function (items) {
                        console.log("items", items)
                        //BasketService.saveBasket(items); replace if already created with same name
                        if(items.length<=0){
                            console.log("empty bskt")
                            $scope.emptyBasketWarn="The basket is empty"
                        }else{
                            Products.buyFromXKom(items).then(function (result) {
                                console.log("after buying from local server ->Xkom", result)
                            })

                        }

                    };

                    $scope.deleteAnitem=function (item) {
                        console.log("delete it",item);
                        var index = $scope.basketItems.indexOf(item);
                        $scope.basketItems.splice(index, 1)
                        var arr=eval($scope.basketItems);
                        var sum = 0;
                        console.log("here",arr)
                        if(arr.length<=0){
                            console.log("here")
                            $scope.sumPrice=0;
                        }else{
                            for (var i in arr) {
                                sum += parseFloat(arr[i].itemPrice);

                            }
                            $scope.sumPrice=sum;
                        }

                        console.log("sum",sum)

                        BasketService.deleteAnItemOfMainBasket(item._id).then(function (result) {
                            console.log("deleted",result.data)
                        });

                    }

                    $scope.saveBasket = function (items) {

                        if(items.length<=0){
                            $scope.saved="Basket  can not be empty. Put some items."
                        }else {

                            console.log("call service to save basket")
                            BasketService.saveBasket(items, $scope.basketName,$scope.basketStatus).then(function (result) {
                                console.log("result", result);
                                $scope.saved = "Basket was saved"
                            })

                        }


                    };

                }
            })
            .state({
                name: 'EmpHome',
                url: '/loginx',
                templateUrl: '../index.html'
            })
            .state({
                name: 'login',
                url: '/:token/login',
                //templateUrl: '../index.html',
                controller: 'loginCtrl'


            })
    })/*.run(function ($rootScope, $location) {

    $rootScope.$on('$route ChangeStart', function (event, next, current) {
        if ($rootScope.session == null) {
            if (next.templateUrl === '../templates/login.html') {

            } else {
                $location.path('/login')
            }
        }
    })
});
*/