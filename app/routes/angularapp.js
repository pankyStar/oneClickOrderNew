/*
angular.module('App', [])
    .controller('angularController', ['$scope', function($scope) {
        console.log("in angular app",$scope);
        //loadEmployeePage();
      //  fn_load();
    }]);
function loadEmployeePage(){
        document.getElementById("emp_content").innerHTML='<object type="text/html" data="/app/views/EmployeeHomePage.html" ></object>';

}
function fn_load(){

    console.log("myfunction");
    employeeModel.finAll().then(function (result) {
      var _result=null;
        result.forEach(function (value, index, array) {
          if(value.name===window.location.href){
              _result = value;
          }
      });
        return _result;
    });
}*/
