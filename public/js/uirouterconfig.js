angular.module('OneClickApp')
    .config(function ($stateProvider, $urlRouterProvider) {
console.log("in router conf");
        $urlRouterProvider.otherwise("EmpHome");
        $stateProvider
            .state({
                name:'Template',
                url:'/',
                templateUrl: '../templates/template.html'
            })
            .state({
                name:'EmpHomePage',
                url:'/emp',
                templateUrl:'../templates/EmployeeHomePage.html',
                controller: 'mainController'

            })

            .state({
                name:'EmpHomePage.search',
                url:'/search'
            })
            .state({
            name:'EmpHomePage.searchresults',
             url:'/search/list',
            templateUrl:'../templates/searchList.html'
            })
            .state({
                name:"EmpHomePage.basket",
                url:"/basket/items",
                templateUrl:'../templates/BasketItems.html'

            })
            .state({
                name:'EmpHome',
            url:'/login',
            templateUrl:'../index.html'
        }).state({
            name:'login',
            url:'/oneClickApp/*/login',
            templateUrl:'../templates/login.html',
            controller:'loginCtrl'

        })
    }).run(function ($rootScope, $location) {

        $rootScope.$on('$route ChangeStart', function (event, next, current) {
            if($rootScope.session==null)
            {
                if(next.templateUrl==='../templates/login.html'){

                }else{
                    $location.path('/login')
                }
            }
        })
});
