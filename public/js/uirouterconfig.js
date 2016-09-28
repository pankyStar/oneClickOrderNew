angular.module('OneClickApp')
    .config(function ($stateProvider) {
console.log("in router conf")
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
            name:'EmpHomePage1',
            url:'/*',
            templateUrl:'../templates/EmployeeHomePage.html'
             })
            .state({
                name:'EmpHomePage.search',
                url:'/search'
                //templateUrl:'../templates/searchList.html',
                //controller: 'mainController'
            })
            .state({
            name:'EmpHomePage.searchresults',
             url:'/search/list',
            templateUrl:'../templates/searchList.html'


        });
    });
