//"use strict";
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port     = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const http = require('http');
const net = require('net');
const url = require('url');
var mysql=require("mysql");
var employeeModel=require("./app/models/employeeModel");
var fs = require('fs');
var sql = fs.readFileSync('./config/databaseCreator.sql').toString();

var Sequelize=require('sequelize');
var uuid=require('node-uuid');
require('./nightmareRunner.js');


var input=fs.createReadStream("./config/EmployeeDetails.txt");

/*
function fn_load(response){
    console.log("fn_load");
    for(let i=0;i<response.data.length;i++){
        // console.log("resdata",response.data[i].personalToken);
        if(response.data[i].personalToken==window.location.href){
            console.log("match")
            return response.data[i];
        } else {
            console.log("no match")
        }
    }
}*/

// GLOBAL.session={userID_Token :{virtual_Browser:{
//     cookie:{},
//     vb_instance:new Nightmare()
//      }
//      },
//     user_FirstName:firstName,
//     user_LastName:lastname,
//     user_privateLink:privateLink
// };

module.exports=sequelize = new Sequelize(database.urlMySql.database, database.urlMySql.user, database.urlMySql.password, {

    host: database.urlMySql.host,
    dialect: 'mysql',

    pool: {
        max: 50,
        min: 0,
        idle: 10000
    },

});
//httpProxyServer.log()
//sequelize.sync({ force: true })

sequelize
    .authenticate()
    .then(function(err) {
        console.log('DB Connection has been established successfully.');
        sequelize.sync();
    }).then(function () {
    sequelize.query("show tables; ",
        { type: sequelize.QueryTypes.SELECT})
        .then(function(result) {
            console.log("available tables ",result);

        }).then(function( error){

    });
})
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });
/*
try{ sequelize.query("drop table if exists employees;")}
catch(err){
    console.log(err)
}
*/



var fileSplit= function(data) {
    console.log("hello data ",data)
    var values=data.split(" ");
    console.log('syn -------> '+ values.length);
    if (data == 'all done') {

        employeeModel(sequelize).findAll({order:"createdAt"}).then(function (emps) {

            for(let i=0;i<emps.length;i++){
                console.log("i ", i)
            }
        });
    }else {

        employeeModel(sequelize).create({ id:uuid.v1({
            node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
            clockseq: 0x1234,
            msecs: new Date().getTime(),
            nsecs: 5678
        })  , name: values[0], surname: values[1],email:values[2],
            personalToken:values[3] })
            .then(function(employee) {
                console.log("created Employees with id ",employee.get('id'))

            });
    }


};
function createEmpsTF(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last  = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
        }

        remaining = remaining.substring(last);
    });

    input.on('end', function() {
        func('all done');

    });
}


//createEmpsTF(input, fileSplit );
//sequelize.sync()


/*sequelize.query("SELECT COUNT(*) FROM employees;").then(function (result) {
    //console.log(result)
});*/



/*var aunthenticateToPP=function(){


};

*/

var connectionMongoDB = mongoose.connect(database.urlMongoDB).connection;
connectionMongoDB.on('error', function(err) { console.log(err); });
connectionMongoDB.once('open', function() {
    console.log("mongodb connection open");
    console.log(connectionMongoDB)
});
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


require('./app/routes/routes.js')(app);
app.listen(port);

console.log("App listening on port " ,+ port);

console.log("end of server")