
/*
function loadEmployeePage(){
    //var doc = jsdom.jsdom("./public/index.html");
    console.log("doc ",doc);
   // doc.querySelector("emp_content").innerHTML='<object type="text/html" data="/app/views/EmployeeHomePage.html" ></object>';

}

function fn_load(){

    console.log("fn_load,", window.location.href);
    employeeModel(sequelize).finAll().then(function (result) {
        var _result=null;
        result.forEach(function (value, index, array) {
            if(value.name===window.location.href){
                _result = value;
            }
        });
        return _result;
    });

}*/
