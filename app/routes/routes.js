var OrderRouter = require('../models/oneClickOrder.js');
var employeeModel = require('../models/employeeModel.js');
var nightmare = require('../../nightmareRunner.js');
//var jsdom = require("jsdom");
//var app1=require("../../server.js");
module.exports = function (app) {

    console.log("in app routes.js")
    app.all('*', function (req, res, next) {
        console.log(req.url);
        next();
    });


    // getOrder
    /* app.get('/api/orders', function(req, res) {
     findHelper(req,res);

     });*/

    // create
    app.post('/api/orders', function (req, res) {
        console.log("called routes for create")

        OrderRouter.create({
            text: req.body.text,
            done: false
        }, function (err, order) {
            if (err)
                res.send(err);

            findHelper(req, res)
        });

    });

    app.delete('/api/orders/:order_id', function (req, res) {
        OrderRouter.remove({
            _id: req.params.order_id
        }, function (err, order) {
            if (err)
                res.send(err);

            // getOrder
            findHelper(req, res);
        });
    });

    app.get("/oneClickApp.com/:token/loaddata", function (req, res) {
        employeeModel(sequelize).findAll().then(function (result) {
            res.json(result);
        })
    });

    app.post("/oneClickApp.com/callServerForProduct/", function (req, res) {
        console.log("called server for product page",req.body);
        var productLink=req.body.link;
        console.log("product link>>",productLink);
        ///var tokenfromUser = req.params.token;
        //console.log("token from user >>>>> ", tokenfromUser);


            //  console.log(" match*****++++++++++++",result);

                console.log("serverproduct");
                if (typeof productLink !== undefined && productLink !== null && productLink != "") {
                    nightmare.productPage(productLink).then(function (data) {
                        console.log("nightmare product result");
                        res.json(data)
                    });
                }

                });



    app.get("/oneClickApp.com/:token/searchvirtualbrowser/:query", function (req, res) {
        var searchquery = req.params.query;
        var tokenfromUser = req.params.token;
        console.log("searchquery>>>>> ", searchquery);
        console.log("token from user >>>>> ", tokenfromUser);
        findEmpInDb(tokenfromUser, function (result) {
            //    matched=result;
            console.log("after find in db.");
            //  console.log(" match*****++++++++++++",result);
            if (result !== null && result.length <= 0) { //c to >
                console.log("virtualbrowser");
                if (typeof searchquery !== undefined && searchquery !== null && searchquery != "") {
                    nightmare.searchlistInXKom(searchquery).then(function (data) {
                        console.log("data returned from nightmare browser", data);
                        res.json({data: data});
                        console.log("data returned from node server");

                    });
                }
            }
            else {
                res.json({data: "user was not found"});
            }
        });


    });

    function findEmpInDb(personalToken, callback) {

        employeeModel(sequelize).findAll({
            where: {
                personalToken: personalToken
            }
        }).then(function (result) {
            console.log(" no of found emps with token******", result.length);
            callback(result);
        }).catch(err=>console.log("err", err));

    }

    app.get("/oneClickApp.com/:token/login", function (req, res) {
        var tokenfromUser = req.params.token;
        findEmpInDb(tokenfromUser);

    });
    function findHelper(req, res) {
        OrderRouter.find(function (err, orders) {

            if (err) {
                res.send(err);
            }
            res.json(orders);
        });
    }

};